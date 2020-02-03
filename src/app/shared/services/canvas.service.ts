import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  private ctx: CanvasRenderingContext2D;
  constructor(
  ) {
  }

  draw(x: number, y: number, z: number) {
    //this.ctx.fillRect(z * x, z * y, z, z);
  }
}
