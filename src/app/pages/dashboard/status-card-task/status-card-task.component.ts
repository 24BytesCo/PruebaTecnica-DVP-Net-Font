import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-status-card-task',
  styleUrls: ['./status-card-task.component.scss'],
  template: `
    <nb-card  [ngClass]="{ 'off': type === 'success' }">
      <div class="icon-container">
        <div class="icon status-{{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title h5">{{ title }}</div>
        <div class="status paragraph-2">{{ userAsigned +' - '+ state }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardTaskComponent {


  @Input() title: string;
  @Input() type: string;
  @Input() state : string;
  @Input() userAsigned : string;

  
}
