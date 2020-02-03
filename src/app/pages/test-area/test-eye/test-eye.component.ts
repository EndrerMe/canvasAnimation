import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-test-eye',
  templateUrl: './test-eye.component.html',
  styleUrls: ['./test-eye.component.scss']
})
export class TestEyeComponent implements OnInit {

  public canvasStyle = {
    'position': 'absolute',
    'width': window.innerWidth + 'px',
    'height': window.innerHeight + 'px',
  }
  @ViewChild('canvas') canvas: ElementRef;
  private ctx: CanvasRenderingContext2D;
  private eyes: any[] = [];
  private mousePos;
  private isMouseMove: boolean = false;
  private teta: number = 0
  constructor() { }

  ngOnInit() {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    //this.createEye();

    this.canvas.nativeElement.addEventListener('mousemove', (e) => {
      this.isMouseMove = true;

      this.mousePos = {
        x: e.pageX,
        y: e.pageY,
      }
    })

    //this.eyesTracking();
    this.drawSpinograf();
  }

  private drawEye(): void {
    for (let i = 0; i < this.eyes.length; i++) {
      this.ctx.fillStyle = this.eyes[i].color;
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.eyes[i].lineColor;
      this.ctx.ellipse(this.eyes[i].x, this.eyes[i].y, this.eyes[i].radiusX, this.eyes[i].radiusY, this.eyes[i].rotation, this.eyes[i].startAngle, this.eyes[i].endAngle);
      this.ctx.stroke();
      this.ctx.fill();

      this.ctx.fillStyle = this.eyes[i].pupil.color;
      this.ctx.beginPath();
      this.ctx.arc(this.eyes[i].pupil.x, this.eyes[i].pupil.y, this.eyes[i].pupil.radius, 0, 2 * Math.PI, true);
      this.ctx.fill();
    }
  }

  private createEye(): void {
    for (let i = 0; i < 5; i++) {
      this.eyes.push({
        x: Math.floor(Math.random() * ((this.canvas.nativeElement.width - 125) - 125) + 125),
        y: Math.floor(Math.random() * ((this.canvas.nativeElement.height - 125) - 125) + 125),
        lineColor: 'white',
        color: 'white',
        radiusX: 50,
        radiusY: 75,
        rotation: 190,
        startAngle: 0,
        endAngle: 2 * Math.PI,
      })
    }
    this.createPupil();
    this.drawEye();
  }

  private createPupil(): void {
    for (let i = 0; i < this.eyes.length; i++) {
      this.eyes[i].pupil = {
        x: this.eyes[i].x,
        y: this.eyes[i].y,
        color: 'black',
        radius: Math.floor(Math.random() * (35 - 20) + 20),
        step: Math.floor(Math.random() * 135),
        direction: Math.floor(Math.random() * 8),
      }
    }
  }

  private eyesTracking = () => {
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    const rect = this.canvas.nativeElement.getBoundingClientRect();

    if (this.isMouseMove) {
      for (let i = 0; i < this.eyes.length; i++) {

        const angleRad = Math.atan2(this.mousePos.y - rect.top - this.eyes[i].pupil.y, this.mousePos.x - rect.left - this.eyes[i].pupil.x);
        this.eyes[i].pupil.direction = Math.atan2( (Math.sin(this.eyes[i].pupil.direction)*0 + Math.sin(angleRad) ),
          (Math.cos(this.eyes[i].pupil.direction)*0 + Math.cos(angleRad) ));
        
        let addX;
        let addY;

        if (this.eyes[i].x - this.eyes[i].pupil.x <= this.eyes[i].radiusX - this.eyes[i].pupil.radius &&
          this.eyes[i].x - this.eyes[i].pupil.x >= -this.eyes[i].radiusX + this.eyes[i].pupil.radius &&
          this.eyes[i].y - this.eyes[i].pupil.y <= this.eyes[i].radiusY - this.eyes[i].pupil.radius &&
          this.eyes[i].y - this.eyes[i].pupil.y >= -this.eyes[i].radiusY + this.eyes[i].pupil.radius) {
            addX = Math.cos(this.eyes[i].pupil.direction) * 2;
            addY = Math.sin(this.eyes[i].pupil.direction) * 2;

            this.eyes[i].pupil.y = this.eyes[i].pupil.y + addY;
            this.eyes[i].pupil.x = this.eyes[i].pupil.x + addX;
          } else {
            
          } 


        this.ctx.fillStyle = this.eyes[i].color;
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.eyes[i].lineColor;
        this.ctx.ellipse(this.eyes[i].x, this.eyes[i].y, this.eyes[i].radiusX, this.eyes[i].radiusY, this.eyes[i].rotation, this.eyes[i].startAngle, this.eyes[i].endAngle);
        this.ctx.stroke();
        this.ctx.fill();

        this.ctx.fillStyle = this.eyes[i].pupil.color;
        this.ctx.beginPath();
        this.ctx.arc(this.eyes[i].pupil.x, this.eyes[i].pupil.y, this.eyes[i].pupil.radius, 0, 2 * Math.PI, true);
        this.ctx.fill();
      }
    }

    requestAnimationFrame(this.eyesTracking);
  }

  private getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  private drawSpinograf = () => {
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height)
    
    const r1 = 150;
    const r2 = 30;
    const d = 120;

    let x = (r1 - r2) * Math.cos(this.teta) + d * Math.cos( (r1 - r2) * this.teta / r2 );
    let y = (r1 - r2) * Math.sin(this.teta) - d * Math.sin( (r1 - r2) * this.teta / r2 );
    this.teta += 0.006;

    this.ctx.fillStyle = 'red';
    this.ctx.beginPath();
    this.ctx.arc(this.canvas.nativeElement.width / 2 - x, this.canvas.nativeElement.height / 2 - y, 20, 0, 2 * Math.PI, true);
    this.ctx.fill();
    //this.ctx.fillRect(this.canvas.nativeElement.width / 2 - x, this.canvas.nativeElement.height / 2 - y, 15, 15);

    requestAnimationFrame(this.drawSpinograf)
  }

}
