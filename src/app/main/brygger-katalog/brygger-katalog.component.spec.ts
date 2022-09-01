import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BryggerKatalogComponent } from './brygger-katalog.component';

describe('BryggerKatalogComponent', () => {
  let component: BryggerKatalogComponent;
  let fixture: ComponentFixture<BryggerKatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BryggerKatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BryggerKatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
