import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadAntecedentComponent } from './load-antecedent.component';

describe('LoadAntecedentComponent', () => {
  let component: LoadAntecedentComponent;
  let fixture: ComponentFixture<LoadAntecedentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadAntecedentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadAntecedentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
