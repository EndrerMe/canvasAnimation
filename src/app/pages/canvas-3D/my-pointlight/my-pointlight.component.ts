import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import * as fps from 'stats.js';

@Component({
  selector: 'app-my-pointlight',
  templateUrl: './my-pointlight.component.html',
  styleUrls: ['./my-pointlight.component.scss']
})
export class MyPointlightComponent implements OnInit {

  private scene;
  private camera;
  private controls;
  private renderer;
  private fps = new fps();
  private pointLight;
  private width = window.innerWidth;
  private height = window.innerHeight;
  private torusKnot;
  private newPointLight;
  private mouseX;
  private mouseY;

  constructor() {
    this.fps.showPanel( 0 );
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog( 0x000000, 50, 100 );
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 1000);
    this.camera.position.set( 0, 10, 30 );
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.toneMapping = THREE.ReinhardToneMapping;
    document.body.appendChild(this.renderer.domElement);

    this.pointLight = this.createLight(0xffee88);
    this.pointLight.position.set(0, 10, 0)
    this.scene.add(this.pointLight);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set( 0, 2, 0 );
		this.controls.update();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild(this.fps.dom);
    // document.addEventListener('mousemove', (e) => {
    //   this.pointLight.position.x = e.pageX;
    //   this.pointLight.position.y = e.pageY;
    // });
  }

  ngOnInit() {
    this.createFloor();
    this.createGeometry();
    this.anim();
  }

  private anim = () => {
    this.renderScene();
    this.fps.begin();
    this.fps.end();
    requestAnimationFrame(this.anim);
  }

  private renderScene(): void {
    this.renderer.toneMappingExposure = Math.pow( 0.68, 5.0 );
    const time = performance.now() * 0.001;

    this.pointLight.position.y =  Math.sin( time * .7 ) * 7 + 8;
    this.pointLight.power = 150000;

    this.renderer.render( this.scene, this.camera );
  }

  private createFloor(): void {
    const geometry = new THREE.PlaneBufferGeometry(200, 200);
    const material = new THREE.MeshPhongMaterial( {
      color: 0x999999,
      shininess: 0,
      specular: 0x111111
    } );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI/2;
    mesh.scale.multiplyScalar( 3 );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
  }

  private createLight(color) {
    this.scene.add( new THREE.AmbientLight( 0xffee88 ) );

    const intensity = 2.5;

    this.newPointLight = new THREE.PointLight(0xffee88, 1, 100, 2);
    this.newPointLight.castShadow = true;
    this.newPointLight.shadow.camera.near = 1;
    this.newPointLight.shadow.camera.far = 60;
    this.newPointLight.shadow.bias = -0.005;

    const geometry = new THREE.SphereBufferGeometry(.1, 16, 8);
    const material = new THREE.MeshStandardMaterial( {
      emissive: 0xffee88,
      emissiveIntensity: 1,
      color: 0xffee88
    } );
    material.color.multiplyScalar( intensity );
    const sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    this.newPointLight.add(sphere);

    const hemiLight = new THREE.HemisphereLight( 0xffee88, 0xffee88, .22 );
    this.scene.add( hemiLight );


    return this.newPointLight;
  }

  private createGeometry(): void {
    const geometry = new THREE.CylinderBufferGeometry( 0.75, 0.75, 7, 32 );
    const material = new THREE.MeshPhongMaterial( {
      color: 0x999999,
      shininess: 0,
      specular: 0x222222
    } );

    const pillar1 = new THREE.Mesh(geometry, material);
    pillar1.position.set( 10, 3.5, 10 );
    pillar1.castShadow = true;
    pillar1.receiveShadow = true;

    const pillar2 = pillar1.clone();
    pillar2.position.set( 10, 3.5, -10 );

    const pillar3 = pillar1.clone();
    pillar3.position.set( -10, 3.5, 10 );

    const boxGeometry = new THREE.BoxBufferGeometry(7, 7, 7);
    const boxMaterial = new THREE.MeshPhongMaterial( {
      color: 0x999999,
      shininess: 0,
      specular: 0x222222
    } );

    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.set( -10, 3.5, -10 )
    boxMesh.castShadow = true;
    boxMesh.receiveShadow = true;

    this.scene.add( pillar1 );
    this.scene.add( pillar2 );
    this.scene.add( pillar3 );
    this.scene.add( boxMesh );
  }

}
