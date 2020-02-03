// Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ParticlesComponent } from './particles.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'anim',
        pathMatch: 'full'
    },
    {
        path: '',
        component: ParticlesComponent,
        children: [
            { path: 'anim', component: ParticlesComponent },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticlesRoutingModule { }
