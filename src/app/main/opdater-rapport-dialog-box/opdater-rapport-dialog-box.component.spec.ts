import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdaterRapportDialogBoxComponent } from './opdater-rapport-dialog-box.component';

describe('OpdaterRapportDialogBoxComponent', () => {
  let component: OpdaterRapportDialogBoxComponent;
  let fixture: ComponentFixture<OpdaterRapportDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdaterRapportDialogBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdaterRapportDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
