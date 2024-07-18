import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalProviderFormComponent } from './medical-provider-form.component';

describe('MedicalProviderFormComponent', () => {
  let component: MedicalProviderFormComponent;
  let fixture: ComponentFixture<MedicalProviderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalProviderFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalProviderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
