// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { TestAreaComponent } from 'src/app/pages/test-area/test-area.component';
import { TestBallsComponent } from './test-balls/test-balls.component';
import { TestParticlesComponent } from './test-particles/test-particles.component';
import { TestEyeComponent } from './test-eye/test-eye.component';

@NgModule({
  declarations: [
    TestAreaComponent,
    TestBallsComponent,
    TestParticlesComponent,
    TestEyeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TestAreaModule { }
