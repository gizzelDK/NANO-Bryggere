import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdaterPostDialogBoxComponent } from './opdater-post-dialog-box.component';

describe('OpdaterPostDialogBoxComponent', () => {
  let component: OpdaterPostDialogBoxComponent;
  let fixture: ComponentFixture<OpdaterPostDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdaterPostDialogBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdaterPostDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
