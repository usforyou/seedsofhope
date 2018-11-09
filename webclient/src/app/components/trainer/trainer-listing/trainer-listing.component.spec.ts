import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerListingComponent } from './trainer-listing.component';

describe('TrainerListingComponent', () => {
  let component: TrainerListingComponent;
  let fixture: ComponentFixture<TrainerListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
