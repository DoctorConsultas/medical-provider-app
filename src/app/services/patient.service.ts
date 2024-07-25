import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientRequest } from '../models/patient-request.model';
import { PatientResponse } from '../models/patient-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private Url = environment.apiUrl;
  private apiUrl = `${this.Url}/patients`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<PatientResponse[]> {
    return this.http.get<PatientResponse[]>(this.apiUrl);
  }

  getById(id: string): Observable<PatientResponse> {
    return this.http.get<PatientResponse>(`${this.apiUrl}/${id}`);
  }

  create(patient: PatientRequest): Observable<PatientResponse> {
    return this.http.post<PatientResponse>(this.apiUrl, patient);
  }

  update(id: string, patient: PatientRequest): Observable<PatientResponse> {
    return this.http.put<PatientResponse>(`${this.apiUrl}/${id}`, patient);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPatiensByMedicalProvider(idProvider: string): Observable<PatientResponse[]> {
    return this.http.get<PatientResponse[]>(`${this.apiUrl}?medicalProviderId=${idProvider}`);
  }
}
