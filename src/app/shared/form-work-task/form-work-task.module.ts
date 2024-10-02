import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormWorkTaskComponent } from './form-work-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    FormWorkTaskComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [  
    FormWorkTaskComponent
  ]
})
export class FormWorkTaskModule { }
