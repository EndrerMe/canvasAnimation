import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-test-balls',
  templateUrl: './test-balls.component.html',
  styleUrls: ['./test-balls.component.scss']
})
export class TestBallsComponent implements OnInit {

  public canvasStyle = {
    'position': 'absolute',
    'width': window.innerWidth + 'px',
    'height': window.innerHeight + 'px',
  }
  @ViewChild('canvas') canvas: ElementRef;
  private ctx: CanvasRenderingContext2D;

  private balls: any[] = [];
  private isMoveBall: boolean = false;
  private mousePos;
  private currentBall;

  constructor() { }

  ngOnInit() {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    
    this.createBall();
    this.addClickForBalls();
  }

  private addClickForBalls(): void {
    this.canvas.nativeElement.addEventListener('mousedown', (e) => {
      this.mousePos = {
        x: e.pageX,
        y: e.pageY,
      }

      for (let i = 0; i < this.balls.length; i++) {
        if (this.isIntersect(this.mousePos, this.balls[i])) {
          this.currentBall = this.balls[i];
        }
      }
    })

    this.canvas.nativeElement.addEventListener('mousemove', (e) => {
      if (this.currentBall) {
        this.mousePos = {
          x: e.pageX,
          y: e.pageY,
        }

        this.moveBall();
      }
    })

    this.canvas.nativeElement.addEventListener('mouseup', (e) => {
      this.currentBall = null;
    })

  }

  private moveBall(): void {
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    for (let i = 0; i < this.balls.length; i++) {

      if (this.currentBall) {
        if (this.balls[i].id === this.currentBall.id) {
          this.balls[i].x = this.mousePos.x;
          this.balls[i].y = this.mousePos.y;
          this.currentBall = this.balls[i];
        }
      }

      this.ctx.fillStyle = this.balls[i].color;
      this.ctx.beginPath();
      this.ctx.arc(this.balls[i].x, this.balls[i].y, this.balls[i].radius, 0, 2 * Math.PI, true);
      this.ctx.fill();

      for (let j = 0; j < this.balls.length; j++) {

        if (this.balls[j].id === this.currentBall.id) {
          continue; 
        } else {
          const differenceX = this.currentBall.x - this.balls[j].x;
          const differenceY = this.currentBall.y - this.balls[j].y;
          const squareDiffX = differenceX * differenceX;
          const squareDiffY = differenceY * differenceY;
          const summ = squareDiffX + squareDiffY;
          const sqrtOfSumm = Math.sqrt(summ);
          if (sqrtOfSumm < this.balls[j].radius + this.currentBall.radius) {
            const cordsY = this.balls[j].y - this.currentBall.y;
            const cordsX = this.balls[j].x - this.currentBall.x;
            this.bounceBall(cordsX, cordsY, this.balls[j].id);
          }
        }
      }
    }
  }

  private bounceBall(x: number, y: number, id: string): void {
    for (let i = 0; i < this.balls.length; i++) {
      if (this.balls[i].id === id) {
        if (x > 52 && x < 55 && y < 8 && y > -16) {
          console.log("a")
          //left
          let time = 0;
          let timer = setInterval(() => {
            this.balls[i].x += 0.1;
            time++
            if (time === 20) {
              clearInterval(timer)
            }
          }, 10)
        }

        if (x > -14 && x < 7 && y < 55 && y > 52) {
          console.log("b")
          //top
          let time = 0;
          let timer = setInterval(() => {
            this.balls[i].y += 0.1;
            time++
            if (time === 20) {
              clearInterval(timer)
            }
          }, 10)
        }

        if (x > -57 && x < -52 && y < 4 && y > -4) {
          console.log("d")
          //right
          let time = 0;
          let timer = setInterval(() => {
            this.balls[i].x -= 0.1;
            time++
            if (time === 20) {
              clearInterval(timer)
            }
          }, 10)
        }

        if (x > -4 && x < 4 && y < -51 && y > -55) {
          console.log("c")
          //bottom
          let time = 0;
          let timer = setInterval(() => {
            this.balls[i].y -= 0.1;
            time++
            if (time === 20) {
              clearInterval(timer)
            }
          }, 10)
        }
      }
    }
  }

  private createBall(): void {
    for (let i = 0; i < 10; i++) {
      this.balls.push({
        id: '_' + Math.random().toString(36).substr(2, 9),
        x: Math.floor(Math.random() * this.canvas.nativeElement.width),
        y: Math.floor(Math.random() * this.canvas.nativeElement.height),
        color: this.getRandomColor(),
        radius: Math.floor(Math.random() * (35 - 20) + 20),
      });
    }

    this.drawBalls();
  }

  private drawBalls(): void {
    for (let i = 0; i < this.balls.length; i++) {
      this.ctx.fillStyle = this.balls[i].color;
      this.ctx.beginPath();
      this.ctx.arc(this.balls[i].x, this.balls[i].y, this.balls[i].radius, 0, 2 * Math.PI, true);
      this.ctx.fill();
    }
  }

  private getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  private isIntersect(point, circle) {
    return Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius;
  }

}
