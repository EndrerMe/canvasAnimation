// Vendors
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import * as AnaglyphEffect from 'three-anaglypheffect';

@Component({
  selector: 'app-canvas-3D',
  templateUrl: './canvas-3D.component.html',
  styleUrls: ['./canvas-3D.component.scss']
})
export class Canvas3DComponent implements OnInit {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;
  private width = window.innerWidth;
  private height = window.innerHeight;
  private canvas;
  private ctx: CanvasRenderingContext2D;
  private scene;
  private camera;
  private renderer;
  //private geometry;
  private material;
  //private cube;
  private line;
  private ambientLite;
  private controls;
  private cubeMarterial = [
    new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('assets/textures/6247.png'), side: THREE.DoubleSide }),
    new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('assets/textures/6247.png'), side: THREE.DoubleSide }),
    new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('assets/textures/6247.png'), side: THREE.DoubleSide }),
    new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('assets/textures/6247.png'), side: THREE.DoubleSide }),
    new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('assets/textures/6247.png'), side: THREE.DoubleSide }),
    new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('assets/textures/6247.png'), side: THREE.DoubleSide }),
  ];

  private roomMarterial = [
    new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('assets/textures/walls.png'), side: THREE.BackSide }),
    new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('assets/textures/walls.png'), side: THREE.BackSide }),
    new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('assets/textures/walls.png'), side: THREE.BackSide }),
    new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('assets/textures/walls.png'), side: THREE.BackSide }),
    new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('assets/textures/walls.png'), side: THREE.BackSide }),
    new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('assets/textures/walls.png'), side: THREE.BackSide }),
  ];

  private pointerLight;
  //private directionalLight;
  private spotLight;
  private cameraHelper;
  // private room;
  // private roomGeometry;

  private roomWithBox: any[] = [];
  private boxes: any[] = [];
  private effect;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 100 );
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.renderer.setSize(this.width, this.height);
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix()
    })
    
    this.renderer.setClearColor( 0xffffff );
    this.ambientLite = new THREE.AmbientLight( 0xffffff, 1.2 );
    this.ambientLite.castShadow = true;
    this.pointerLight = new THREE.PointLight( 0x00ffbb, 5, 10 );
    //this.directionalLight = new THREE.DirectionalLight( 0x00ffbb, 3 )
    //this.directionalLight.castShadow = true;
    //this.directionalLight.position.set(1, 1, 1)
    //this.directionalLight.position.set( 0, 0, 1 );
    this.spotLight = new THREE.SpotLight( 0x00ffbb, 5 );
    this.spotLight.position.set( 100, 120, 200 );
    this.spotLight.castShadow = true;
    this.scene.add(this.ambientLite);

    this.renderer.shadowMapEnabled = true;
    this.renderer.setPixelRatio( window.devicePixelRatio );

    this.effect = new AnaglyphEffect( this.renderer );
    this.effect.setSize( this.width, this.height );
  }

  ngOnInit() {

    // this.draw();
    // this.createRoom();
    this.createRoomWithBox();
    this.anim();
    this.cameraSetings();
    this.light();
  }

  ngAfterViewInit() {
    this.rendererContainer.nativeElement.appendChild( this.renderer.domElement );
  }

  private render = () => {
    this.renderer.render( this.scene, this.camera );
  }

  private cameraSetings(): void {
    this.camera.position.z = 0.1;
    this.camera.position.y = 0.1;
    this.camera.position.x = 0.1;
    //this.controls.update();
  }

  private light(): void {
    let directionalLight = new THREE.DirectionalLight( 0x916b1d, 1.5 );
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);
  }

  private draw = () => {
    // this.geometry = new THREE.BoxGeometry(2, 2, 2);
    // this.cube = new THREE.Mesh( this.geometry, this.cubeMarterial );
    // this.cube.position.set(0, 0, 0);
    //this.cube.position.set(15, 5, 15)
    // this.cube.castShadow = true;
    // this.cube.receiveShadow = false;
    // this.scene.add(this.cube);
    //this.scene.add(this.pointerLight);
    //this.scene.add(this.directionalLight);
    //this.scene.add(this.spotLight);
    
    //this.scene.add(this.spotLight.target);
    this.camera.position.z = 4;
    this.camera.position.y = 3;
    this.camera.position.x = 3;
    // this.cube.castShadow = true;
    this.cameraHelper =  new THREE.CameraHelper( this.spotLight.shadow.camera );
    //this.scene.add(this.cameraHelper);
    // this.spotLight.target = this.cube;
  }

  private anim = () => {
    // this.cube.rotation.x += 0.005;
    // this.cube.rotation.y += 0.005;

    for (let i = 0; i < this.boxes.length; i++) {
      this.boxes[i].rotation.x += 0.005;
      this.boxes[i].rotation.y += 0.005;
    }

    this.render();
    requestAnimationFrame(this.anim);
  }

  private createRoom(): void {
    // this.roomGeometry = new THREE.BoxGeometry(10, 10, 10);
    // this.room = new THREE.Mesh( this.roomGeometry, this.roomMarterial );
    // this.room.receiveShadow = true;
    // this.scene.add(this.room);

    const floorGeometry = new THREE.BoxGeometry(10, 1, 10);
    const floorMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('assets/textures/walls.png'), side: THREE.DoubleSide})
    const floorCube = new THREE.Mesh(floorGeometry, floorMaterial);
    floorCube.position.y = -5;
    //floorCube.position.set(15, 0, 15)
    //this.scene.add(floorCube);

    const ceilingGeometry = new THREE.BoxGeometry(10, 1, 10);
    const ceilingMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('assets/textures/walls.png'), side: THREE.DoubleSide})
    const celingCube = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    celingCube.position.y = 5;
    //celingCube.position.set(15, 10, 15)
    //this.scene.add(celingCube);

    const leftWallGeometry = new THREE.BoxGeometry(1, 10, 10);
    const leftWallMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('assets/textures/walls.png'), side: THREE.DoubleSide})
    const leftWallCube = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
    leftWallCube.position.x = -5;
    //leftWallCube.position.set(10, 5, 15)
    //this.scene.add(leftWallCube);

    const rightWallGeometry = new THREE.BoxGeometry(1, 10, 10);
    const rightWallMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('assets/textures/walls.png'), side: THREE.DoubleSide})
    const rightWallCube = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
    rightWallCube.position.x = 5;
    //rightWallCube.position.set(20, 5, 15)
    //this.scene.add(rightWallCube);

    const frontWallGeometry = new THREE.BoxGeometry(10, 10, 1);
    const frontWallMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('assets/textures/walls.png'), side: THREE.DoubleSide})
    const frontWallCube = new THREE.Mesh(frontWallGeometry, frontWallMaterial);
    frontWallCube.position.z = 5;
    //frontWallCube.position.set(15, 5, 20)
    //this.scene.add(frontWallCube);

    const backWallGeometry = new THREE.BoxGeometry(10, 10, 1);
    const backWallMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('assets/textures/walls.png'), side: THREE.DoubleSide})
    const backWallCube = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWallCube.position.z = -5;
    //backWallCube.position.set(15, 5, 10)
    //this.scene.add(backWallCube);
  }

  private createRoomWithBox(): void {
    for (let i = 0; i < 10; i++) {
      let x = Math.floor(Math.random() * 80) - 40;
      let y = Math.floor(Math.random() * 80) - 40;
      let z = Math.floor(Math.random() * 80) - 40;
      this.roomWithBox.push({
        x: x,
        y: y,
        z: z,
        width: 10,
        height: 10,
        length: 10,
        box: {
          x: x,
          y: y,
          z: z,
          width: 2,
          height: 2,
          length: 2,
        },
        light: {
          x: x,
          y: y,
          z: z,
          color: this.getRandomColor(),
          brightness: Math.floor(Math.random() * (10 - 1.5) + 1.5),
          distance: Math.floor(Math.random() * (100 - 50) + 50),
        }
      })
    }

    this.spawnRoomWithBox();
  }

  private spawnRoomWithBox(): void {
    for (let i = 0; i < this.roomWithBox.length; i++) {
      let roomGeometry = new THREE.BoxGeometry(this.roomWithBox[i].width, this.roomWithBox[i].height, this.roomWithBox.length);
      let room = new THREE.Mesh( roomGeometry, this.roomMarterial );
      room.receiveShadow = true;
      this.scene.add(room);
      room.position.set(this.roomWithBox[i].x, this.roomWithBox[i].y, this.roomWithBox[i].z);

      let boxGeometry = new THREE.BoxGeometry(this.roomWithBox[i].box.width, this.roomWithBox[i].box.height, this.roomWithBox[i].box.length);
      let box = new THREE.Mesh( boxGeometry, this.cubeMarterial );
      box.castShadow = true;
      box.receiveShadow = false;
      this.boxes.push(box);
      this.scene.add(box);
      box.position.set(this.roomWithBox[i].box.x, this.roomWithBox[i].box.y, this.roomWithBox[i].box.z);
    }
  }

  private getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

}
