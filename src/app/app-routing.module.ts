// Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ParticlesComponent } from 'src/app/pages/particles/particles.component';
import { BallsComponent } from 'src/app/pages/balls/balls.component';
import { SpawnBallsComponent } from 'src/app/pages/spawn-balls/spawn-balls.component';
import { DotsComponent } from 'src/app/pages/dots/dots.component';
import { BlackHollComponent } from './pages/black-holl/black-holl.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'particles',
    pathMatch: 'full',
  },
  {
    path: 'particles',
    loadChildren: 'src/app/pages/particles/particles.module#ParticlesModule'
  },
  {
    path: 'balls',
    loadChildren: 'src/app/pages/balls/balls.module#BallsModule'
  },
  {
    path: 'spawn-balls',
    loadChildren: 'src/app/pages/spawn-balls/spawn-balls.module#SpawnBallsModule'
  },
  {
    path: 'dots',
    loadChildren: 'src/app/pages/dots/dots.module#DotsModule'
  },
  {
    path: 'black-holl',
    loadChildren: 'src/app/pages/black-holl/black-holl.module#BlackHollModule'
  },
  {
    path: 'canvas-3D',
    loadChildren: 'src/app/pages/canvas-3D/canvas-3D.module#Canvas3DModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
