import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-test-particles',
  templateUrl: './test-particles.component.html',
  styleUrls: ['./test-particles.component.scss']
})
export class TestParticlesComponent implements OnInit {

  public canvasStyle = {
    'position': 'absolute',
    'width': window.innerWidth + 'px',
    'height': window.innerHeight + 'px',
  }
  @ViewChild('canvas') canvas: ElementRef;
  private ctx: CanvasRenderingContext2D;

  private particles: any[] = [];
  private ball;

  constructor() { }

  ngOnInit() {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    
    this.createMainBall();
  }

  // private createParticle(): void {
  //   for (let i = 0; i < 1000; i++) {
  //     this.particles.push({
  //       x: Math.floor(Math.random() * this.canvas.nativeElement.width / 2 + this.canvas.nativeElement.width / 4.5),
  //       y: Math.floor(Math.random() * this.canvas.nativeElement.width / 2 + this.canvas.nativeElement.width / 4.5),
  //       radius: 3,
  //       color: 'white',
  //     })
  //   }

  //   this.drawparticles();
  // }

  private drawParticles(): void {
    for (let i = 0; i < 200; i++) {
      const x = Math.floor(Math.random() * (this.ball.x - 10) + 10);
      const y = Math.floor(Math.random() * (this.ball.y - 10) + 10);

      this.ctx.fillStyle = this.getRandomColor();
      this.ctx.beginPath();
      this.ctx.arc(x, y, 3, 0, 2 * Math.PI, true);
      this.ctx.fill();
    }
  }

  private createMainBall(): void {
    this.ball = {
      x: 355,
      y: 355,
      radius: 11,
      color: 'orange',
    }

    this.drawMainBall();
  }

  private drawMainBall(): void {
    this.ctx.fillStyle = this.ball.color;
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, 2 * Math.PI, true);
    this.ctx.fill();

    //this.animMainBall();
  }

  private getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  private animMainBall = () => {
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    this.ball.x += 0.5;
    this.ball.y += 0.5;

    this.ctx.fillStyle = this.ball.color;
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, 2 * Math.PI, true);
    this.ctx.fill();
    
    this.drawParticles()
    requestAnimationFrame(this.animMainBall)
  }

  private anim(): void {
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    for (let i = 0; i < this.particles.length; i++) {
      
    }
  }

}
