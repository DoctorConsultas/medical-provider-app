import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSummaryComponent } from './home-summary.component';

describe('HomeSummaryComponent', () => {
  let component: HomeSummaryComponent;
  let fixture: ComponentFixture<HomeSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSummaryComponent]
    });
    fixture = TestBed.createComponent(HomeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
