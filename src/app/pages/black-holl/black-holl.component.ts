import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-black-holl',
  templateUrl: './black-holl.component.html',
  styleUrls: ['./black-holl.component.scss']
})
export class BlackHollComponent implements OnInit {
  public canvasStyle = {
    'position': 'absolute',
    'width': window.innerWidth + 'px',
    'height': window.innerHeight + 'px',
  }
  @ViewChild('canvas') canvas: ElementRef;
  private ctx: CanvasRenderingContext2D;
  private particles: any[] = [];
  private blackHolls: any[] = [];
  private isMoveToMouse: boolean = false;
  private mousePosition;
  private collapsFactor: number = 1;
  private numToHole: number = 1;
  
  constructor() { }

  ngOnInit() {

    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.addParticle();

    this.canvas.nativeElement.addEventListener('mousemove', (e) => {
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
  }

  private addParticle(): void {
    for(let i = 0; i < 3000; i++) {
      this.particles.push({
        x: Math.floor(Math.random() * this.canvas.nativeElement.width),
        y: Math.floor(Math.random() * this.canvas.nativeElement.height),
        color: 'white',
        radius: 1.5,
        stepCount: Math.floor(Math.random() * 135),
        direction: Math.floor(Math.random() * 8),
      });
    }

    this.drawParticle();
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].stepCount = 0;
    }
  }

  private drawParticle = () => {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    const rect = this.canvas.nativeElement.getBoundingClientRect();

    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].stepCount === 0) {
        this.particles[i].stepCount = Math.floor(Math.random() * 135);
        this.particles[i].direction = Math.floor(Math.random() * 8);
      } else {
        this.particles[i].stepCount--;
      }

        // try {
          // const angleRad = Math.atan2(this.mousePosition.y - rect.top - this.particles[i].y, this.mousePosition.x - rect.left - this.particles[i].x);
          // this.particles[i].direction = Math.atan2( (Math.sin(this.particles[i].direction)*10 + Math.sin(angleRad) ),
          //                           (Math.cos(this.particles[i].direction)*10 + Math.cos(angleRad) ));
        // }
        // catch(err) {
        //   if (this.particles[i].x < 0){
        //     this.particles[i].x += this.canvas.nativeElement.width;
        //   }
        //   else if (this.particles[i].x > this.mousePosition.x){
        //     this.particles[i].x -= this.canvas.nativeElement.width;
        //   }
        //   if (this.particles[i].y < 0){
        //     this.particles[i].y += this.canvas.nativeElement.height;
        //   }
        //   else if (this.particles[i].y > this.mousePosition.y){
        //     this.particles[i].y -= this.canvas.nativeElement.height;
        //   }
        // } 
        // const differenceX = this.mousePosition.x - this.particles[i].x;
        // const differenceY = this.mousePosition.y - this.particles[i].y;
        // const squareDiffX = differenceX * differenceX;
        // const squareDiffY = differenceY * differenceY;
        // const summ = squareDiffX + squareDiffY;
        // const sqrtOfSumm = Math.sqrt(summ);

        // const addX = Math.cos(this.particles[i].direction)*2 * 2;
        // const addY = Math.sin(this.particles[i].direction)*2 * 2;

        // if (sqrtOfSumm < 150) {
        //   this.particles[i].stepCount = 0;

        //   this.particles[i].y = this.particles[i].y - addY;
        //   this.particles[i].x = this.particles[i].x - addX;
        // } else {

          // this.particles[i].y = this.particles[i].y + addY;
          // this.particles[i].x = this.particles[i].x + addX;
        // }
      
      if (this.isMoveToMouse) {
        const differenceX = this.mousePosition.x - this.particles[i].x;
        const differenceY = this.mousePosition.y - this.particles[i].y;
        const squareDiffX = differenceX * differenceX;
        const squareDiffY = differenceY * differenceY;
        const summ = squareDiffX + squareDiffY;
        const sqrtOfSumm = Math.sqrt(summ);

        if (sqrtOfSumm < 100) {
          const angleRad = Math.atan2(this.mousePosition.y - rect.top - this.particles[i].y, this.mousePosition.x - rect.left - this.particles[i].x);
          this.particles[i].direction = Math.atan2( (Math.sin(this.particles[i].direction)*10 + Math.sin(-angleRad) ),(Math.cos(this.particles[i].direction)*10 + Math.cos(angleRad) ));
          const addX = Math.cos(this.particles[i].direction)*3 * 2;
          const addY = Math.sin(this.particles[i].direction)*3 * 2;

          this.particles[i].y = this.particles[i].y + addY;
          this.particles[i].x = this.particles[i].x + addX;
          this.particles[i].color = 'yellow';
        } 
        this.anim(this.particles[i]);
      }

      this.anim(this.particles[i]);
    }
    requestAnimationFrame(this.drawParticle);
  }

  private anim(particle): void {
    switch (particle.direction) {
      case 0 :
        // top
        particle.y = particle.y - 1;
        break;
      case 1 :
        // right
        particle.x = particle.x + 1;
        break;
      case 2 :
        // bottom
        particle.y = particle.y + 1;
        break;
      case 3 :
        // left
        particle.x = particle.x - 1;
        break;
      case 4 :
        // right-top
        particle.x = particle.x + 1;
        particle.y = particle.y - 1;
        break;
      case 5 :
        // right-bottom
        particle.x = particle.x + 1;
        particle.y = particle.y + 1;
        break;
      case 6 :
        // left-bottom
        particle.x = particle.x - 1;
        particle.y = particle.y + 1;
        break;
      case 7 :
        // left-top
        particle.x = particle.x - 1;
        particle.y = particle.y - 1;
        break;
    }

    if (particle.x < 0 || particle.x > this.canvas.nativeElement.width || particle.y < 0 || particle.y > this.canvas.nativeElement.height) {
      particle.stepCount = 0;
    }

    this.ctx.fillStyle = particle.color;
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI, true);
    this.ctx.fill();
  }

}
