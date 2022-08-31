import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagAdminSideComponent } from './tag-admin-side.component';

describe('TagAdminSideComponent', () => {
  let component: TagAdminSideComponent;
  let fixture: ComponentFixture<TagAdminSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagAdminSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagAdminSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
