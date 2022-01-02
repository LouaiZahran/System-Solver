import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSolverComponent } from './system-solver.component';

describe('SystemSolverComponent', () => {
  let component: SystemSolverComponent;
  let fixture: ComponentFixture<SystemSolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSolverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
