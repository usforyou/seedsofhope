import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeListingComponent } from './trainee-listing.component';

describe('TraineeListingComponent', () => {
  let component: TraineeListingComponent;
  let fixture: ComponentFixture<TraineeListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
