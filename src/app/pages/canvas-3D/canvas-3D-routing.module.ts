// Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { Canvas3DComponent } from 'src/app/pages/canvas-3D/canvas-3D.component';
import { ModelComponent } from 'src/app/pages/canvas-3D/model/model.component';
import { Particles3dComponent } from 'src/app/pages/canvas-3D/particles3d/particles3d.component';
import { PointlightComponent } from 'src/app/pages/canvas-3D/pointlight/pointlight.component';
import { MyPointlightComponent } from 'src/app/pages/canvas-3d/my-pointlight/my-pointlight.component';
import { LihtningDotsComponent } from 'src/app/pages/canvas-3d/lihtning-dots/lihtning-dots.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'anim',
        pathMatch: 'full'
    },
    {
        path: '',
        component: PointlightComponent,
        children: [
            { path: 'anim', component:  PointlightComponent},
            { path: 'model', component:  PointlightComponent},
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Canvas3DRoutingModule { }
