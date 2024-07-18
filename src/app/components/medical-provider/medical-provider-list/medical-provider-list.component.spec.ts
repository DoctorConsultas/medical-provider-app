import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalProviderListComponent } from './medical-provider-list.component';

describe('MedicalProviderListComponent', () => {
  let component: MedicalProviderListComponent;
  let fixture: ComponentFixture<MedicalProviderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalProviderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalProviderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
