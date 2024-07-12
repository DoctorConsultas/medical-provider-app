import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MedicalProviderListComponent } from './components/medical-provider-list/medical-provider-list.component';
import { MedicalProviderFormComponent } from './components/medical-provider-form/medical-provider-form.component';
import { MedicListComponent } from './components/medic-list/medic-list.component';
import { MedicFormComponent } from './components/medic-form/medic-form.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { PrescriptionListComponent } from './components/prescription-list/prescription-list.component';
import { PrescriptionFormComponent } from './components/prescription-form/prescription-form.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MedicalProviderListComponent,
    MedicalProviderFormComponent,
    MedicListComponent,
    MedicFormComponent,
    PatientListComponent,
    PatientFormComponent,
    PrescriptionListComponent,
    PrescriptionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
