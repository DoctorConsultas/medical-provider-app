import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HomeSummaryComponent } from './components/home-summary/home-summary.component';
import { MedicalProviderListComponent } from './components/medical-provider-list/medical-provider-list.component';
import { MedicalProviderFormComponent } from './components/medical-provider-form/medical-provider-form.component';
import { MedicListComponent } from './components/medic-list/medic-list.component';
import { MedicFormComponent } from './components/medic-form/medic-form.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { PrescriptionListComponent } from './components/prescription-list/prescription-list.component';
import { PrescriptionFormComponent } from './components/prescription-form/prescription-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: 'home', component: HomeSummaryComponent },
    { path: 'medical-providers', component: MedicalProviderListComponent },
    { path: 'medical-providers/new', component: MedicalProviderFormComponent },
    { path: 'medical-providers/edit/:id', component: MedicalProviderFormComponent },
    { path: 'medics', component: MedicListComponent },
    { path: 'medics/new', component: MedicFormComponent },
    { path: 'medics/edit/:id', component: MedicFormComponent },
    { path: 'patients', component: PatientListComponent },
    { path: 'patients/new', component: PatientFormComponent },
    { path: 'patients/edit/:id', component: PatientFormComponent },
    { path: 'prescriptions', component: PrescriptionListComponent },
    { path: 'prescriptions/new', component: PrescriptionFormComponent },
    { path: 'prescriptions/edit/:id', component: PrescriptionFormComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' } // Redirigir a la ruta de resumen dentro del HomeComponent
  ]},
  { path: '**', redirectTo: '' } // Redirigir cualquier otra ruta a HomeComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
