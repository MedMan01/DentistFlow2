import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDentistComponent } from './new-dentist.component';

describe('NewDentistComponent', () => {
  let component: NewDentistComponent;
  let fixture: ComponentFixture<NewDentistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewDentistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewDentistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
