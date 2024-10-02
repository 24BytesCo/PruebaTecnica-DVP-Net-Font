import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormWorkTaskModule } from './form-work-task/form-work-task.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormUserModule } from './form-user/form-user.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormWorkTaskModule,
    FormUserModule
  ]
})
export class SharedModule { }
