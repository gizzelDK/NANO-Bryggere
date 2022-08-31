import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdminSideComponent } from './login-admin-side.component';

describe('LoginAdminSideComponent', () => {
  let component: LoginAdminSideComponent;
  let fixture: ComponentFixture<LoginAdminSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAdminSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAdminSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
