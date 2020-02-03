// Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { DotsComponent } from 'src/app/pages/dots/dots.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'anim',
        pathMatch: 'full'
    },
    {
        path: '',
        component: DotsComponent,
        children: [
            { path: 'anim', component: DotsComponent },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DotsRoutingModule { }
