import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import * as fps from 'stats.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector';

@Component({
  selector: 'app-lihtning-dots',
  templateUrl: './lihtning-dots.component.html',
  styleUrls: ['./lihtning-dots.component.scss']
})
export class LihtningDotsComponent implements OnInit {

  @ViewChild('rendererContainer1') rendererContainer: ElementRef;
  private scene;
  private camera;
  private renderer;
  private controls;
  private fps = new fps();
  private pointLights = [];
  private stats;

  constructor() {
    this.init();
  }

  ngOnInit() {
    this.anim();
  }

  private createLight(color) {
    const intensity = 2.5;

    const createdPointLight = new THREE.PointLight(color, intensity, 6);
    createdPointLight.castShadow = true;
    createdPointLight.shadow.camera.near = 1;
    createdPointLight.shadow.camera.far = 60;
    createdPointLight.shadow.bias = -0.005;

    const geometry = new THREE.SphereBufferGeometry(.3, 12, 6);
    const material = new THREE.MeshBasicMaterial({ color: color });
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
      alphaTest: 0.5,
    });

    const sphere2 = new THREE.Mesh(geometry2, material2);
    sphere2.castShadow = true;
    sphere2.receiveShadow = true;
    createdPointLight.add(sphere2);

    const distanceMaterial = new THREE.MeshDistanceMaterial( {
      // alphaMap: material.alphaMap,
      alphaTest: material.alphaTest,
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

    for (let i = 0; i < this.pointLights.length; i++) {
      this.pointLights[i].position.x = Math.sin( time * 0.6 ) * 10.5;
      this.pointLights[i].position.y = Math.sin( time * 0.7 ) * 10.5 + 10.5;
      this.pointLights[i].position.z = Math.sin( time * 0.8 ) * 10.5;

      time += 10000;
    }

    // this.pointLight.position.x = Math.sin( time * 0.6 ) * 9;
    // this.pointLight.position.y = Math.sin( time * 0.7 ) * 9 + 6;
    // this.pointLight.position.z = Math.sin( time * 0.8 ) * 9;

    // this.pointLight.rotation.x = time;
    // this.pointLight.rotation.z = time;

    // time += 10000;

    // this.pointLight2.position.x = Math.sin( time * 0.6 ) * 9;
    // this.pointLight2.position.y = Math.sin( time * 0.7 ) * 9 + 6;
    // this.pointLight2.position.z = Math.sin( time * 0.8 ) * 9;
    
    // this.pointLight2.rotation.x = time;
    // this.pointLight2.rotation.z = time;

    this.renderer.render( this.scene, this.camera );
    this.stats.update();
  }

  private init(): void {
    this.fps.showPanel( 0 );
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.camera.position.set( 0, 10, 40 );

    this.scene.add( new THREE.AmbientLight( 0x444444 ) );
    
    // this.pointLight = this.createLight(0x0088ff);
    // this.scene.add(this.pointLight);

    // this.pointLight2 = this.createLight(0xff8888);
    // this.scene.add(this.pointLight2);

    for (let i = 0; i < 1; i++) {
      this.pointLights.push(this.createLight(this.getRandomColor()));
      this.scene.add(this.pointLights[i]);
    }

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

    // const mirrorGeometry = new THREE.CircleBufferGeometry( 30, 30, 30 );
    // const groundMirror = new Reflector( mirrorGeometry, {
    //   clipBias: 0.003,
    //   textureWidth: window.innerWidth * window.devicePixelRatio,
    //   textureHeight: window.innerHeight * window.devicePixelRatio,
    //   color: 0xff0000,
    //   recursion: 1
    // } );
    // groundMirror.position.y = -1;
    // groundMirror.rotateX( - Math.PI / 2 );
    // this.scene.add( groundMirror );

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

  private getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  private createRoom() {
    var size = 100;
				var geometry = new THREE.PlaneBufferGeometry( size, size );
				var material = new THREE.MeshPhongMaterial( { color: 0x222222, specular: 0x222222, shininess: 75 } );
				var transparentMaterial = new THREE.MeshPhongMaterial( { color: 0x222222, emissive: 0x88888888, specular: 0x222222, shininess: 75, opacity: 0.3, transparent: true } );
				var room = new THREE.Object3D();
				room.position.y = size / 2 - 30;
				// top
				var mesh = new THREE.Mesh( geometry, material );
				mesh.rotation.x = Math.PI / 2;
				mesh.position.y = size / 2;
				room.add( mesh );
				// bottom
				mesh = new THREE.Mesh( geometry, material );
				mesh.rotation.x = - Math.PI / 2;
				mesh.position.y = - size / 2;
				room.add( mesh );
				// left
				mesh = new THREE.Mesh( geometry, material );
				mesh.position.x = - size / 2;
				mesh.rotation.y = Math.PI / 2;
				room.add( mesh );
				// right
				mesh = new THREE.Mesh( geometry, material );
				mesh.position.x = size / 2;
				mesh.rotation.y = - Math.PI / 2;
				room.add( mesh );
				// back
				mesh = new THREE.Mesh( geometry, material );
				mesh.position.z = - size / 2;
				room.add( mesh );
				// front, to check if transparency works
				mesh = new THREE.Mesh( geometry, transparentMaterial );
				mesh.position.z = size / 2;
				mesh.scale.multiplyScalar( 0.33 );
				mesh.visible = false;

  }

}
