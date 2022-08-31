import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifikatAdminSideComponent } from './certifikat-admin-side.component';

describe('CertifikatAdminSideComponent', () => {
  let component: CertifikatAdminSideComponent;
  let fixture: ComponentFixture<CertifikatAdminSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertifikatAdminSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertifikatAdminSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
