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

  getPrescriptionsByMedicalProviderId(medicalProviderId: string, page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('medicalProviderId', medicalProviderId)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/by-medical-provider-paginated`, { params });
  }

  getPrescriptionsByMedicIdAndMedicalProviderId(medicId: string, medicalProviderId: string, page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('medicId', medicId)
      .set('medicalProviderId', medicalProviderId)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/by-medic-and-medical-provider-paginated`, { params });
  }
}
