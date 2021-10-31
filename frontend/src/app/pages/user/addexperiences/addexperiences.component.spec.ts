import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddexperiencesComponent } from './addexperiences.component';

describe('AddexperiencesComponent', () => {
  let component: AddexperiencesComponent;
  let fixture: ComponentFixture<AddexperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddexperiencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddexperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
