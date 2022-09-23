import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlettedeBrugereAdminComponent } from './slettede-brugere-admin.component';

describe('SlettedeBrugereAdminComponent', () => {
  let component: SlettedeBrugereAdminComponent;
  let fixture: ComponentFixture<SlettedeBrugereAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlettedeBrugereAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlettedeBrugereAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
