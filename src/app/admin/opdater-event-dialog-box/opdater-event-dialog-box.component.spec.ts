import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdaterEventDialogBoxComponent } from './opdater-event-dialog-box.component';

describe('OpdaterEventDialogBoxComponent', () => {
  let component: OpdaterEventDialogBoxComponent;
  let fixture: ComponentFixture<OpdaterEventDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdaterEventDialogBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdaterEventDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
