import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dots',
  templateUrl: './dots.component.html',
  styleUrls: ['./dots.component.scss']
})
export class DotsComponent implements OnInit {

  public canvasStyle = {
    'position': 'absolute',
    'width': window.innerWidth + 'px',
    'height': window.innerHeight + 'px',
  }
  @ViewChild('canvas') canvas: ElementRef;
  private dots: any[] = [];
  private ctx: CanvasRenderingContext2D;
  private timer;

  constructor() { }

  ngOnInit() {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.canvas.nativeElement.addEventListener('click', (e) => {
      this.spawnDot(e.pageX, e.pageY);
    })

    this.addDot();
  }

  private spawnDot(x, y): void {
    if (this.dots.length > 100) {
      this.dots.splice(1, 1);
    }

    this.dots.push({
      x: x,
      y: y,
      color: 'white',
      radius: 3,
      stepCount: Math.floor(Math.random() * 135),
      direction: Math.floor(Math.random() * 8),
    })
  }

  private addDot(): void {
    for (let j = 0; j < 80; j++) {
      this.dots.push({
        x: Math.floor(Math.random() * this.canvas.nativeElement.width),
        y: Math.floor(Math.random() * this.canvas.nativeElement.height),
        color: 'white',
        radius: 3,
        stepCount: Math.floor(Math.random() * 135),
        direction: Math.floor(Math.random() * 8),
      });
    }

    this.drawDot();
  }

  private drawDot(): void {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    for (let i = 0; i < this.dots.length; i++) {
      if (this.dots[i].stepCount === 0) {
        this.dots[i].stepCount = Math.floor(Math.random() * 135);
        this.dots[i].direction = Math.floor(Math.random() * 8);
      } else {
        this.dots[i].stepCount--;
      }

      switch (this.dots[i].direction) {
        case 0 :
          // top
          this.dots[i].y = this.dots[i].y - 1;
          break;
        case 1 :
          // right
          this.dots[i].x = this.dots[i].x + 1;
          break;
        case 2 :
          // bottom
          this.dots[i].y = this.dots[i].y + 1;
          break;
        case 3 :
          // left
          this.dots[i].x = this.dots[i].x - 1;
          break;
        case 4 :
          // right-top
          this.dots[i].x = this.dots[i].x + 1;
          this.dots[i].y = this.dots[i].y - 1;
          break;
        case 5 :
          // right-bottom
          this.dots[i].x = this.dots[i].x + 1;
          this.dots[i].y = this.dots[i].y + 1;
          break;
        case 6 :
          // left-bottom
          this.dots[i].x = this.dots[i].x - 1;
          this.dots[i].y = this.dots[i].y + 1;
          break;
        case 7 :
          // left-top
          this.dots[i].x = this.dots[i].x - 1;
          this.dots[i].y = this.dots[i].y - 1;
          break;
      }

      if (this.dots[i].x < -10 || this.dots[i].x > this.canvas.nativeElement.width + 10 || this.dots[i].y < -10 || this.dots[i].y > this.canvas.nativeElement.height + 10) {
        this.dots[i].stepCount = 0;
      }
      this.ctx.fillStyle = this.dots[i].color;
      this.ctx.beginPath();
      this.ctx.arc(this.dots[i].x, this.dots[i].y, this.dots[i].radius, 0, 2 * Math.PI, true);
      this.ctx.fill();
      for (let j = 0; j < this.dots.length; j++) {
        const differenceX = this.dots[j].x - this.dots[i].x;
        const differenceY = this.dots[j].y - this.dots[i].y;
        const squareDiffX = differenceX * differenceX;
        const squareDiffY = differenceY * differenceY;
        const summ = squareDiffX + squareDiffY;
        const sqrtOfSumm = Math.sqrt(summ);

        if (sqrtOfSumm < 150) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = 'orange';
          this.ctx.moveTo(this.dots[i].x, this.dots[i].y);
          this.ctx.lineTo(this.dots[j].x, this.dots[j].y);
          this.ctx.stroke();
        }
      }
    }

    this.timer = setTimeout(() => {
      this.drawDot();
    }, 15);
  }

}
