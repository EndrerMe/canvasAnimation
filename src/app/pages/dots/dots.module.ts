import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotsRoutingModule } from './dots-routing.module';
import { DotsComponent } from './dots.component';

@NgModule({
  declarations: [
    DotsComponent
  ],
  imports: [
    CommonModule,
    DotsRoutingModule
  ]
})
export class DotsModule { }
