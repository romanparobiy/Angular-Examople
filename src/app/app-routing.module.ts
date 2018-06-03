import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartsComponent }      from './parts/parts.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { PartDetailComponent }  from './part-detail/part-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'parts', component: PartsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: PartDetailComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {
  
 }
