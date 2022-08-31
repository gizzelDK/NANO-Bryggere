import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminForsideComponent } from './admin-forside.component';

describe('AdminForsideComponent', () => {
  let component: AdminForsideComponent;
  let fixture: ComponentFixture<AdminForsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminForsideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminForsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
