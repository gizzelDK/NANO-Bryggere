import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOpskriftListeComponent } from './ol-opskrift-liste.component';

describe('OlOpskriftListeComponent', () => {
  let component: OlOpskriftListeComponent;
  let fixture: ComponentFixture<OlOpskriftListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlOpskriftListeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlOpskriftListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
