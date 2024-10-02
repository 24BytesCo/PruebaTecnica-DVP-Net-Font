import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWorkTaskComponent } from './form-work-task.component';

describe('FormWorkTaskComponent', () => {
  let component: FormWorkTaskComponent;
  let fixture: ComponentFixture<FormWorkTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormWorkTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormWorkTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
