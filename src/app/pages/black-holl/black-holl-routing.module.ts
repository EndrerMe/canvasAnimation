// Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { BlackHollComponent } from 'src/app/pages/black-holl/black-holl.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'anim',
        pathMatch: 'full'
    },
    {
        path: '',
        component: BlackHollComponent,
        children: [
            { path: 'anim', component: BlackHollComponent },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlackHollRoutingModule { }
