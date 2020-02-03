import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticlesRoutingModule } from './particles-routing.module';
import { ParticlesComponent } from './particles.component';

@NgModule({
  declarations: [
    ParticlesComponent
  ],
  imports: [
    CommonModule,
    ParticlesRoutingModule,
  ]
})
export class ParticlesModule { }
