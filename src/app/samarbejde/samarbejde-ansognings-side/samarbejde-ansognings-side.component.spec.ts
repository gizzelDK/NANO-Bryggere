import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamarbejdeAnsogningsSideComponent } from './samarbejde-ansognings-side.component';

describe('SamarbejdeAnsogningsSideComponent', () => {
  let component: SamarbejdeAnsogningsSideComponent;
  let fixture: ComponentFixture<SamarbejdeAnsogningsSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamarbejdeAnsogningsSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SamarbejdeAnsogningsSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
