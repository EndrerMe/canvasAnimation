import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import * as fps from 'stats.js';

@Component({
  selector: 'app-pointlight',
  templateUrl: './pointlight.component.html',
  styleUrls: ['./pointlight.component.scss']
})
export class PointlightComponent implements OnInit {
  @ViewChild('rendererContainer1') rendererContainer: ElementRef;
  private scene;
  private camera;
  private renderer;
  private controls;
  private fps = new fps();
  private pointLight;
  private pointLight2;
  private stats;

  constructor() {
    this.init();
  }

  ngOnInit() {
    this.anim();
  }

  private createLight(color) {
    const intensity = 1.5;

    const createdPointLight = new THREE.PointLight(color, intensity, 20);
    createdPointLight.castShadow = true;
    createdPointLight.shadow.camera.near = 1;
    createdPointLight.shadow.camera.far = 60;
    createdPointLight.shadow.bias = -0.005;

    const geometry = new THREE.SphereBufferGeometry(.3, 12, 6);
    const material = new THREE.MeshBasicMaterial({ color });
    material.color.multiplyScalar( intensity );
    const sphere = new THREE.Mesh( geometry, material );
    sphere.castShadow = true;
    createdPointLight.add( sphere );

    const texture = new THREE.CanvasTexture( this.generateTexture() );
    texture.magFilter = THREE.NearestFilter;
    texture.wrapT = THREE.RepeatWrapping;
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.set( 1, 4.5 );

    const geometry2 = new THREE.SphereBufferGeometry( 2, 32, 8 );
    const material2 = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      alphaMap: texture,
      alphaTest: .5,
    });

    const sphere2 = new THREE.Mesh(geometry2, material2);
    sphere2.castShadow = true;
    sphere2.receiveShadow = true;
    createdPointLight.add(sphere2);

    const distanceMaterial = new THREE.MeshDistanceMaterial( {
      alphaMap: material2.alphaMap,
      alphaTest: material2.alphaTest,
    } );
    sphere2.customDistanceMaterial = distanceMaterial;
    return createdPointLight;
  }

  private generateTexture() {
    const canvas = document.createElement( 'canvas' );
    canvas.width = 2;
    canvas.height = 2;

    const context = canvas.getContext( '2d' );
    context.fillStyle = 'white';
    context.fillRect( 0, 1, 2, 1 );

    return canvas;
  }

  private anim = () => {
    requestAnimationFrame(this.anim);
    this.render();
  }

  private render(): void {
    let time = performance.now() * 0.001;

    this.pointLight.position.x = Math.sin( time * 0.6 ) * 9;
    this.pointLight.position.y = Math.sin( time * 0.7 ) * 9 + 6;
    this.pointLight.position.z = Math.sin( time * 0.8 ) * 9;

    this.pointLight.rotation.x = time;
    this.pointLight.rotation.z = time;

    time += 10000;

    this.pointLight2.position.x = Math.sin( time * 0.6 ) * 9;
    this.pointLight2.position.y = Math.sin( time * 0.7 ) * 9 + 6;
    this.pointLight2.position.z = Math.sin( time * 0.8 ) * 9;
    
    this.pointLight2.rotation.x = time;
    this.pointLight2.rotation.z = time;

    this.renderer.render( this.scene, this.camera );
    this.stats.update();
  }

  private init(): void {
    this.fps.showPanel( 0 );
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.camera.position.set( 0, 10, 40 );

    this.scene.add( new THREE.AmbientLight( 0x111122 ) );

    this.pointLight = this.createLight(0x0088ff);
    this.scene.add(this.pointLight);

    this.pointLight2 = this.createLight(0xff8888);
    this.scene.add(this.pointLight2);

    const geometry = new THREE.BoxBufferGeometry(30, 30, 30);
    const material = new THREE.MeshPhongMaterial({
      color: 0xa0adaf,
      shininess: 10,
      specular: 0x111111,
      side: THREE.BackSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 10;
    mesh.receiveShadow = true;
    this.scene.add(mesh);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enable = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
    document.body.appendChild(this.renderer.domElement);

    const orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    orbitControls.target.set(0, 10, 0);
    orbitControls.update();

    this.stats = new fps();
    document.body.appendChild(this.stats.dom);
  }

}
