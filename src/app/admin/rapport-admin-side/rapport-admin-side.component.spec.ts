import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportAdminSideComponent } from './rapport-admin-side.component';

describe('RapportAdminSideComponent', () => {
  let component: RapportAdminSideComponent;
  let fixture: ComponentFixture<RapportAdminSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportAdminSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapportAdminSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
