import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyVeicleComponent } from './modify-veicle.component';

describe('ModifyVeicleComponent', () => {
  let component: ModifyVeicleComponent;
  let fixture: ComponentFixture<ModifyVeicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyVeicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyVeicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
