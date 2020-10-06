import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotaAutoComponent } from './prenota-auto.component';

describe('PrenotaAutoComponent', () => {
  let component: PrenotaAutoComponent;
  let fixture: ComponentFixture<PrenotaAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrenotaAutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrenotaAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
