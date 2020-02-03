// Vendors
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-balls',
  templateUrl: './balls.component.html',
  styleUrls: ['./balls.component.scss']
})
export class BallsComponent implements OnInit {
  public canvasStyle = {
    'position': 'absolute',
    'width': window.innerWidth + 'px',
    'height': window.innerHeight + 'px',
  }
  @ViewChild('canvas') canvas: ElementRef;
  private ctx: CanvasRenderingContext2D;
  private spawnTimer;
  private balls: any[] = [];
  
  constructor() { }

  ngOnInit() {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.addBall()
  }

  private addBall(): void {
    setInterval(() => {
      this.balls.push({
        x: Math.floor(Math.random() * 5),
        y: Math.floor(Math.random() * 25),
        radius: Math.floor(Math.random() * (30 - 15) + 15),
        color: this.getRandomColor(),
        vx: Math.floor(Math.random() * (16 - 7) + 7),
        vy: -Math.floor(Math.random() * (21 - 7) + 7),
      });
    }, 40)
    requestAnimationFrame(this.drawBall);
  }

  private getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  private drawBall = () => {
    if (this.balls.length === 160) {
      this.balls.splice(1, 1);
    }

    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height)
    for (let i = 0; i < this.balls.length; i++) {
      this.ctx.fillStyle = this.balls[i].color;
      this.ctx.beginPath();
      this.ctx.arc(this.balls[i].x, this.balls[i].y, this.balls[i].radius, 0, 2 * Math.PI, true);
      this.ctx.fill();

      if (this.balls[i].y + this.balls[i].vy > this.canvas.nativeElement.height || this.balls[i].y + this.balls[i].vy < 0) {
        this.balls[i].vy = -this.balls[i].vy;
      }
      if (this.balls[i].x + this.balls[i].vx > this.canvas.nativeElement.width || this.balls[i].x + this.balls[i].vx < 0) {
        this.balls[i].vx = -this.balls[i].vx;
      }

      this.balls[i].x += this.balls[i].vx;
      this.balls[i].y += this.balls[i].vy;
    }

    requestAnimationFrame(this.drawBall)
  }

}
