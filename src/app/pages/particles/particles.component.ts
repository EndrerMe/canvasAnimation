import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.scss']
})
export class ParticlesComponent implements OnInit {
  public canvasStyle = {
    'position': 'absolute',
    'width': window.innerWidth + 'px',
    'height': window.innerHeight + 'px',
  }
  @ViewChild('canvas') canvas: ElementRef;
  private ctx: CanvasRenderingContext2D;
  private isMoveToMouse: boolean = false;
  private particles: any[] = [];
  private mousePosition;
  private boom: number = 3;

  constructor() { }

  ngOnInit() {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.canvas.nativeElement.addEventListener('click', (e) => {
      this.dotBoom(e.pageX, e.pageY);
    })

    this.canvas.nativeElement.addEventListener('mousemove', (e) => {
      this.boom = 3;
      this.isMoveToMouse = true;
      this.mousePosition = {
        x: e.pageX,
        y: e.pageY,
      }
    })

    this.canvas.nativeElement.addEventListener('mouseout', (e) => {
      this.isMoveToMouse = false;

      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].stepCount = 0;
      }
    })

    this.addParticle();
  }

  private dotBoom(x: number, y: number): void {
    this.boom = 100;
  }

  private addParticle(): void {
    for(let i = 0; i < 2500; i++) {
      this.particles.push({
        x: Math.floor(Math.random() * this.canvas.nativeElement.width),
        y: Math.floor(Math.random() * this.canvas.nativeElement.height),
        color: this.getRandomColor(),
        radius: 1.5,
        step: Math.floor(Math.random() * 135),
        direction: Math.floor(Math.random() * 8),
      });
    }

    this.drawParticle();
  }

  private drawParticle = () => {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].stepCount
         === 0) {
        this.particles[i].stepCount = Math.floor(Math.random() * 135);
        this.particles[i].direction = Math.floor(Math.random() * 8);
      } else {
        this.particles[i].stepCount--;
      }

      if (this.isMoveToMouse) {
        const rect = this.canvas.nativeElement.getBoundingClientRect();
        try {
          const angleRad = Math.atan2(this.mousePosition.y - rect.top - this.particles[i].y, this.mousePosition.x - rect.left - this.particles[i].x);
          this.particles[i].direction = Math.atan2( (Math.sin(this.particles[i].direction)*this.boom + Math.sin(angleRad) ),
                                    (Math.cos(this.particles[i].direction)*this.boom + Math.cos(angleRad) ));
        }

        catch(err) {
          if (this.particles[i].x < 0){
            this.particles[i].x += this.canvas.nativeElement.width;
          }
          else if (this.particles[i].x > this.mousePosition.x) {
            this.particles[i].x -= this.canvas.nativeElement.width;
          }
          if (this.particles[i].y < 0) {
            this.particles[i].y += this.canvas.nativeElement.height;
          }
          else if (this.particles[i].y > this.mousePosition.y) {
            this.particles[i].y -= this.canvas.nativeElement.height;
          }
        } 
        const addX = Math.cos(this.particles[i].direction)*2 * 2;
        const addY = Math.sin(this.particles[i].direction)*2 * 2;

        this.particles[i].y = this.particles[i].y + addY;
        this.particles[i].x = this.particles[i].x + addX;

      } else {
        switch (this.particles[i].direction) {
          case 0 :
            // top
            this.particles[i].y = this.particles[i].y - 1;
            break;
          case 1 :
            // right
            this.particles[i].x = this.particles[i].x + 1;
            break;
          case 2 :
            // bottom
            this.particles[i].y = this.particles[i].y + 1;
            break;
          case 3 :
            // left
            this.particles[i].x = this.particles[i].x - 1;
            break;
          case 4 :
            // right-top
            this.particles[i].x = this.particles[i].x + 1;
            this.particles[i].y = this.particles[i].y - 1;
            break;
          case 5 :
            // right-bottom
            this.particles[i].x = this.particles[i].x + 1;
            this.particles[i].y = this.particles[i].y + 1;
            break;
          case 6 :
            // left-bottom
            this.particles[i].x = this.particles[i].x - 1;
            this.particles[i].y = this.particles[i].y + 1;
            break;
          case 7 :
            // left-top
            this.particles[i].x = this.particles[i].x - 1;
            this.particles[i].y = this.particles[i].y - 1;
            break;
        }
      }

      if (this.particles[i].x < -10 || this.particles[i].x > this.canvas.nativeElement.width + 10 || this.particles[i].y < -10 || this.particles[i].y > this.canvas.nativeElement.height + 10) {
        this.particles[i].stepCount = 0;
      }

      this.ctx.fillStyle = this.particles[i].color;
      this.ctx.beginPath();
      this.ctx.arc(this.particles[i].x, this.particles[i].y, this.particles[i].radius, 0, 2 * Math.PI, true);
      this.ctx.fill();
    }

    requestAnimationFrame(this.drawParticle);
  }

  private getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

}
