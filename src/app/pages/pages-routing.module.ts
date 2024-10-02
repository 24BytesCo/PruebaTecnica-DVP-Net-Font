import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuard } from '../@core/guards/auth.guard';
import { UserGuard } from '../@core/guards/user.guard';
import { UserComponent } from './users/user.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivate:  [AuthGuard], 
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,

    },
    {
      path: 'users/manage',
      component: UserComponent,
      canActivate: [UserGuard]

    },
    
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
