import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ImagesComponent } from './components/images/images.component';


const routes: Routes = [
  { path:'', redirectTo:'dashboard', pathMatch:'full' },
  { path: 'dashboard', component:DashboardComponent },
  { path: 'images/:id', component:ImagesComponent },
  { path: '**', redirectTo:'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
