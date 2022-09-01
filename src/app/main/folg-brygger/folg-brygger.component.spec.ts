import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolgBryggerComponent } from './folg-brygger.component';

describe('FolgBryggerComponent', () => {
  let component: FolgBryggerComponent;
  let fixture: ComponentFixture<FolgBryggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolgBryggerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolgBryggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
