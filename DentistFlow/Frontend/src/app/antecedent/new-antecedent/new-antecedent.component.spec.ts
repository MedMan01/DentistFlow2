import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAntecedentComponent } from './new-antecedent.component';

describe('NewAntecedentComponent', () => {
  let component: NewAntecedentComponent;
  let fixture: ComponentFixture<NewAntecedentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewAntecedentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewAntecedentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
