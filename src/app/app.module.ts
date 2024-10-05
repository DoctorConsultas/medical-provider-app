import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http'; // Import provideHttpClient and withFetch
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MedicComponent } from './components/medic/medic.component';
import { MedicFormComponent } from './components/medic/medic-form/medic-form.component';
import { MedicListComponent } from './components/medic/medic-list/medic-list.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientFormComponent } from './components/patient/patient-form/patient-form.component';
import { PatientListComponent } from './components/patient/patient-list/patient-list.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';
import { PrescriptionFormComponent } from './components/prescription/prescription-form/prescription-form.component';
import { PrescriptionListComponent } from './components/prescription/prescription-list/prescription-list.component';
import { HomeSummaryComponent } from './components/home/home-summary/home-summary.component';
import { MedicalProviderComponent } from './components/medical-provider/medical-provider.component';
import { MedicalProviderFormComponent } from './components/medical-provider/medical-provider-form/medical-provider-form.component';
import { MedicalProviderListComponent } from './components/medical-provider/medical-provider-list/medical-provider-list.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MatCardModule } from '@angular/material/card';
import { CalendarModule } from 'primeng/calendar';
import { MatGridListModule } from '@angular/material/grid-list';
import { DateTimeFormatPipe } from './pipe/date-time-format-pipe';
import { LoginComponent } from './components/login/login.component';
import { environment as env } from '../environments/environment';
import { DocumentNumberPipe } from './pipe/document-number.pipe';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeSummaryComponent,
    MedicComponent,
    MedicFormComponent,
    MedicListComponent,
    PatientComponent,
    PatientFormComponent,
    PatientListComponent,
    PrescriptionComponent,
    PrescriptionFormComponent,
    PrescriptionListComponent,
    MedicalProviderComponent,
    MedicalProviderFormComponent,
    MedicalProviderListComponent,
    DateTimeFormatPipe,
    LoginComponent,
    DocumentNumberPipe
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
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    TableModule,
    PaginatorModule,
    HttpClientModule,
    DropdownModule,
    MatCardModule,
    CalendarModule,
    MatGridListModule,
    CheckboxModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()), // Provide HttpClient with fetch
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
