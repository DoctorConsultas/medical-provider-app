import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrescriptionRequest } from '../models/prescription-request.model';
import { PrescriptionResponse } from '../models/prescription-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private Url = environment.apiUrl;
  private apiUrl = `${this.Url}/prescriptions`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<PrescriptionResponse[]> {
    return this.http.get<PrescriptionResponse[]>(this.apiUrl);
  }

  getById(id: string): Observable<PrescriptionResponse> {
    return this.http.get<PrescriptionResponse>(`${this.apiUrl}/${id}`);
  }

  create(prescription: PrescriptionRequest): Observable<PrescriptionResponse> {
    return this.http.post<PrescriptionResponse>(this.apiUrl, prescription);
  }

  update(id: string, prescription: PrescriptionRequest): Observable<PrescriptionResponse> {
    return this.http.put<PrescriptionResponse>(`${this.apiUrl}/${id}`, prescription);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPrescriptionsByMedicalProviderId(medicalProviderId: string, statuses: string[], page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('medicalProviderId', medicalProviderId)
      .set('statuses', statuses.join(','))
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/by-medical-provider-paginated`, { params });
  }

  getPrescriptionsByMedicIdAndMedicalProviderId(medicId: string, medicalProviderId: string, statuses: string[], page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('medicId', medicId)
      .set('medicalProviderId', medicalProviderId)
      .set('statuses', statuses.join(','))
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/by-medic-and-medical-provider-paginated`, { params });
  }

  getPrescriptionsByPatientIdAndMedicalProviderId(patientId: string, medicalProviderId: string, statuses: string[], page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('patientId', patientId)
      .set('medicalProviderId', medicalProviderId)
      .set('statuses', statuses.join(','))
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/by-patient-and-medical-provider-paginated`, { params });
  }

  getPrescriptionsByMedicalProviderAndDateRange(medicalProviderId: string, startDate: string, endDate: string, statuses: string[], page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('medicalProviderId', medicalProviderId)
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('statuses', statuses.join(','))
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/by-medical-provider-and-date-range`, { params });
  }

  getPrescriptionsByMedicIdAndDateRange(medicId: string, startDate: string, endDate: string, statuses: string[]): Observable<PrescriptionResponse[]> {
    let params = new HttpParams()
      .set('medicId', medicId)
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('statuses', statuses.join(','));

    return this.http.get<PrescriptionResponse[]>(`${this.apiUrl}/by-medic-and-date-range`, { params });
  }

  downloadExcel(
    statuses: string[],
    medicId?: string,
    patientId?: string,
    startDate?: string,
    endDate?: string,
  ): Observable<Blob> {
    let params = new HttpParams()
      .set('statuses', statuses.join(','));

    if (medicId) {
      params = params.set('medicId', medicId);
    }

    if (patientId) {
      params = params.set('patientId', patientId);
    }

    if (startDate && endDate) {
      params = params.set('startDate', startDate);
      params = params.set('endDate', endDate);
    }

    return this.http.get(`${this.apiUrl}/download/excel`, {
      params: params,
      responseType: 'blob'
    });
  }


  getPrescriptionsByFilters(
    statuses: string[],
    medicId: string,
    patientId: string,
    startDate?: string,
    endDate?: string,
    page?: number,
    size?: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('statuses', statuses.join(','))

    if (page) {
      params = params.set('page', page.toString());
    }
    if (size) {
      params = params.set('size', size.toString());
    }

    if (medicId) {
      params = params.set('medicId', medicId);
    }

    if (patientId) {
      params = params.set('patientId', patientId);
    }

    if (startDate && endDate) {
      params = params.set('startDate', startDate);
      params = params.set('endDate', endDate);
    }
    return this.http.get<PrescriptionResponse[]>(`${this.apiUrl}/get-prescriptions-by-filters`, { params });
  }
}