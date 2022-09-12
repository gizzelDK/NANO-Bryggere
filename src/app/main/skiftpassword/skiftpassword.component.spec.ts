import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkiftpasswordComponent } from './skiftpassword.component';

describe('SkiftpasswordComponent', () => {
  let component: SkiftpasswordComponent;
  let fixture: ComponentFixture<SkiftpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkiftpasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkiftpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
