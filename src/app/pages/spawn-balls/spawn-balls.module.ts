import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpawnBallsRoutingModule } from './spawn-balls-routing.module';
import { SpawnBallsComponent } from './spawn-balls.component';

@NgModule({
  declarations: [
    SpawnBallsComponent
  ],
  imports: [
    CommonModule,
    SpawnBallsRoutingModule
  ]
})
export class SpawnBallsModule { }
