import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KopierOpskriftComponent } from './kopier-opskrift.component';

describe('KopierOpskriftComponent', () => {
  let component: KopierOpskriftComponent;
  let fixture: ComponentFixture<KopierOpskriftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KopierOpskriftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KopierOpskriftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
