import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootFindingComponent } from './root-finding.component';

describe('RootFindingComponent', () => {
  let component: RootFindingComponent;
  let fixture: ComponentFixture<RootFindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RootFindingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootFindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
