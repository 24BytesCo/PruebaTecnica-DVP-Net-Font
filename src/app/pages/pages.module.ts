import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { TaskModule } from './users/user.module';
import { FormUserModule } from '../shared/form-user/form-user.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
    FormsModule,
    FormUserModule
  ],
  declarations: [
    PagesComponent,
    LoginComponent,
  ],
})
export class PagesModule {
}
