// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { Canvas3DComponent } from 'src/app/pages/canvas-3D/canvas-3D.component';
import { ModelComponent } from 'src/app/pages/canvas-3D/model/model.component';
import { Particles3dComponent } from 'src/app/pages/canvas-3D/particles3d/particles3d.component';
import { PointlightComponent } from 'src/app/pages/canvas-3D/pointlight/pointlight.component';
import { MyPointlightComponent } from 'src/app/pages/canvas-3d/my-pointlight/my-pointlight.component';
import { LihtningDotsComponent } from 'src/app/pages/canvas-3d/lihtning-dots/lihtning-dots.component';

// Routs
import { Canvas3DRoutingModule } from 'src/app/pages/canvas-3D/canvas-3D-routing.module';

@NgModule({
  declarations: [
    Canvas3DComponent,
    ModelComponent,
    Particles3dComponent,
    PointlightComponent,
    MyPointlightComponent,
    LihtningDotsComponent
  ],
  imports: [
    CommonModule,
    Canvas3DRoutingModule
  ]
})
export class Canvas3DModule { }
