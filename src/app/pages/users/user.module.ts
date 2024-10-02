import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormWorkTaskModule } from '../../shared/form-work-task/form-work-task.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { FormUserModule } from '../../shared/form-user/form-user.module';



@NgModule({
  declarations: [UserComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    FormWorkTaskModule,
    DashboardModule,
    FormUserModule


  ]
})
export class TaskModule { }
