import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing
import { BallsRoutingModule } from 'src/app/pages/balls/balls-routing.module';
// Components
import { BallsComponent } from 'src/app/pages/balls/balls.component';

@NgModule({
  declarations: [
    BallsComponent
  ],
  imports: [
    CommonModule,
    BallsRoutingModule
  ]
})
export class BallsModule { }
