import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HomeSummaryComponent } from './components/home/home-summary/home-summary.component';
import { MedicComponent } from './components/medic/medic.component';
import { MedicListComponent } from './components/medic/medic-list/medic-list.component';
import { MedicFormComponent } from './components/medic/medic-form/medic-form.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientListComponent } from './components/patient/patient-list/patient-list.component';
import { PatientFormComponent } from './components/patient/patient-form/patient-form.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';
import { PrescriptionListComponent } from './components/prescription/prescription-list/prescription-list.component';
import { PrescriptionFormComponent } from './components/prescription/prescription-form/prescription-form.component';
import { MedicalProviderComponent } from './components/medical-provider/medical-provider.component';
import { MedicalProviderFormComponent } from './components/medical-provider/medical-provider-form/medical-provider-form.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard, AuthService } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent, 
    canActivate: [AuthGuard], // Ensure user is authenticated
    children: [
      { path: 'home', component: HomeSummaryComponent },
      { path: 'medical-providers', component: MedicalProviderComponent, children: [
        { path: '', component: MedicalProviderComponent },
        { path: 'new', component: MedicalProviderFormComponent },
        { path: 'edit/:id', component: MedicalProviderFormComponent }
      ]},
      { path: 'medics', component: MedicComponent, children: [
        { path: '', component: MedicListComponent },
        { path: 'new', component: MedicFormComponent },
        { path: 'edit/:id', component: MedicFormComponent }
      ]},
      { path: 'patients', component: PatientComponent, children: [
        { path: '', component: PatientListComponent },
        { path: 'new', component: PatientFormComponent },
        { path: 'edit/:id', component: PatientFormComponent }
      ]},
      { path: 'prescriptions', component: PrescriptionComponent, children: [
        { path: '', component: PrescriptionListComponent },
        { path: 'new', component: PrescriptionFormComponent },
        { path: 'edit/:id', component: PrescriptionFormComponent }
      ]},
      { path: '', redirectTo: 'prescriptions', pathMatch: 'full' } // Redirect to prescriptions if no child route matches
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' } // Redirect any unknown path to the login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
