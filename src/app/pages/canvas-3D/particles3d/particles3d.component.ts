// Vendors
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import * as fps from 'stats.js';

// Effects
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect';

@Component({
  selector: 'app-particles3d',
  templateUrl: './particles3d.component.html',
  styleUrls: ['./particles3d.component.scss']
})
export class Particles3dComponent implements OnInit {
  @ViewChild('rendererContainer1') rendererContainer: ElementRef;
  private scene;
  private camera;
  private renderer;
  private controls;
  private effect;
  private fps = new fps();
  private particles: any[] = [];
  private textureCube;
  private particlesMarterial;
  private mouse;
  
  constructor() {
    this.fps.showPanel( 0 );
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    const path = "assets/textures/cube/pisa/";
    const format = '.png';
    const urls = [
      path + 'px' + format, path + 'nx' + format,
      path + 'py' + format, path + 'ny' + format,
      path + 'pz' + format, path + 'nz' + format
    ];
    this.textureCube = new THREE.CubeTextureLoader().load( urls );
    this.scene.background = this.textureCube;
    this.camera.position.z = 3;
		this.camera.focalLength = 3;

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.mouse = new THREE.Vector2();
    window.addEventListener('mousemove', (e) => {
      this.onMouseMove(e);
    });
  }

  ngOnInit() {
    this.spawnParticles();
    this.anim();
  }

  ngAfterViewInit() {
    this.rendererContainer.nativeElement.appendChild( this.renderer.domElement );
    document.body.appendChild( this.fps.dom );
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  private render(): void {
    let timer = 0.0001 * Date.now();

    this.camera.position.x += ( this.mouse.x - this.camera.position.x ) * .025;
		this.camera.position.y += ( - this.mouse.y - this.camera.position.y ) * .025;

    this.camera.lookAt( this.scene.position );

    this.partcielesMove(timer)

    this.effect.render(this.scene, this.camera);
  }

  private anim = () => {
    this.render();
    this.fps.begin();

	// monitored code goes here

	  this.fps.end();
    requestAnimationFrame(this.anim);
  }

  private spawnParticles(): void {
    const particlesGeometry = new THREE.SphereBufferGeometry(0.1, 32, 16);
    this.particlesMarterial = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: this.textureCube });
    for (let i = 0; i < 350; i++) {
      let particle = new THREE.Mesh( particlesGeometry, this.particlesMarterial );

      particle.position.x = Math.random() * 10 - 5;
      particle.position.y = Math.random() * 10 - 5;
      particle.position.z = Math.random() * 10 - 5;

      particle.scale.x = particle.scale.y = particle.scale.z = Math.random() * 3 + 1;

      this.scene.add(particle);
      this.particles.push(particle)
    }

    const outlineConfig = {
      defaultAlpha: 1,
      defaultColor: [0,0,0,0,0,0],
      defaultKeepAlive: true,
    } 

    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.effect = new OutlineEffect( this.renderer, outlineConfig);
		this.effect.setSize( window.innerWidth, window.innerHeight );
  }

  private onMouseMove(event): void {
    this.mouse.x = ( event.clientX - window.innerWidth / 2 ) / 100;
		this.mouse.y = ( event.clientY - window.innerHeight / 2 ) / 100;
  }

  // private onClickHold(event): void {
    
  // }

  private partcielesMove(timer): void {
    for ( let i = 0, il = this.particles.length; i < il; i ++ ) {
      let particle = this.particles[ i ];
      particle.position.x = 5 * Math.tan( timer + i);
      particle.position.y = 5 * Math.sin( timer + i * 1.1);
    }
  }

}
