import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import * as OrbitControls from 'three-orbitcontrols';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  @ViewChild('rendererContainer1') rendererContainer: ElementRef;
  private scene;
  private camera;
  private renderer;
  private hlight;
  private loader;
  private model;
  private controls;
  private spotLight;

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xffffff );
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.camera.position.z = 10;
    // this.camera.rotation.y = 45/180 * Math.PI;
    this.camera.position.x = 10;
    this.camera.position.y = 10;
    // this.camera.position.z = 1000;

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.loader = new GLTFLoader();

    this.renderer.setClearColor( 0xffffff, 0 );
    this.spotLight = new THREE.PointLight( 0xff0000, 10 );
    this.spotLight.position.set( 100, 1000, 100 );
    this.spotLight.castShadow = true;
    this.scene.add(this.spotLight);
    this.loader.shadowMapEnabled = true;

    this.loader.load('assets/3d-models/cars/scene.gltf', (gltf) => {
      this.model = gltf.scene.children[0];
      this.model.scale.set(1.5, 1.5, 1.5);
      this.scene.add(gltf.scene);
      this.renderer.render(this.scene, this.camera);
    });

    
  }

  ngOnInit() {
    this.anim();
  }

  ngAfterViewInit() {
    this.rendererContainer.nativeElement.appendChild( this.renderer.domElement );
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  private render = () => {
    this.renderer.render(this.scene, this.camera);
  }

  private anim = () => {
    this.render();
    requestAnimationFrame(this.anim);
  }

}
