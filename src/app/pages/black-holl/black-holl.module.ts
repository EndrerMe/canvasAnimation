import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlackHollComponent } from './black-holl.component';
import { BlackHollRoutingModule } from './black-holl-routing.module';

@NgModule({
  declarations: [
    BlackHollComponent
  ],
  imports: [
    CommonModule,
    BlackHollRoutingModule
  ]
})
export class BlackHollModule { }
