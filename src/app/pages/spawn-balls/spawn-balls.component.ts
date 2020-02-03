import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-spawn-balls',
  templateUrl: './spawn-balls.component.html',
  styleUrls: ['./spawn-balls.component.scss']
})
export class SpawnBallsComponent implements OnInit {

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

    this.canvas.nativeElement.addEventListener('mousedown', (e) => {
      this.spawnTimer = setInterval(() => {
        this.spawnBall(e.pageX, e.pageY);
      }, 100);
    });

    this.canvas.nativeElement.addEventListener('mouseup', (e) => {
      clearInterval(this.spawnTimer);
    })

    this.drawBall();
  }

  private spawnBall(x: number, y: number): void {
    let randomNum = Math.floor(Math.random() * (5 - 1) + 1)

    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height)

    this.addNewBall(x, y, randomNum);
  }

  private addNewBall(x, y, num): void {
    if (this.balls.length === 80) {
      this.balls.splice(1, 1);
    }

    let vx: number;
    let vy: number;

    switch (num) {
      case 1:
        vx = Math.floor(Math.random() * (13 - 4) + 4);
        vy = Math.floor(Math.random() * (17 - 4) + 4);
        break;
      case 2:
        vx = Math.floor(Math.random() * (13 - 4) + 4);
        vy = -Math.floor(Math.random() * (17 - 4) + 4);
        break;
      case 3:
        vx = -Math.floor(Math.random() * (13 - 4) + 4);
        vy = Math.floor(Math.random() * (17 - 4) + 4);
        break;
      case 4:
        vx = -Math.floor(Math.random() * (13 - 4) + 4);
        vy = -Math.floor(Math.random() * (17 - 4) + 4);
        break;
    }

    this.balls.push({
      x: x,
      y: y,
      radius: Math.floor(Math.random() * (50 - 15) + 15),
      color: this.getRandomColor(),
      vx: vx,
      vy: vy,
    });
  }

  private getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  private drawBall = () => {
    if (this.balls.length === 60) {
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
