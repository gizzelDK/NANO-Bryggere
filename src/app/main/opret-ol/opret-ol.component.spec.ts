import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpretOlComponent } from './opret-ol.component';

describe('OpretOlComponent', () => {
  let component: OpretOlComponent;
  let fixture: ComponentFixture<OpretOlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpretOlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpretOlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
