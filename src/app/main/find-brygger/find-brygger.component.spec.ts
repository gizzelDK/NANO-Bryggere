import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBryggerComponent } from './find-brygger.component';

describe('FindBryggerComponent', () => {
  let component: FindBryggerComponent;
  let fixture: ComponentFixture<FindBryggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindBryggerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindBryggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
