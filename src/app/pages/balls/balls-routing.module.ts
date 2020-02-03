// Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { BallsComponent } from './balls.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'anim',
        pathMatch: 'full'
    },
    {
        path: '',
        component: BallsComponent,
        children: [
            { path: 'anim', component: BallsComponent },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BallsRoutingModule { }
