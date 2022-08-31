import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpretEventDialogBoxComponent } from './opret-event-dialog-box.component';

describe('OpretEventDialogBoxComponent', () => {
  let component: OpretEventDialogBoxComponent;
  let fixture: ComponentFixture<OpretEventDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpretEventDialogBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpretEventDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
