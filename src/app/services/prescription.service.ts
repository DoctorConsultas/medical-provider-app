import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrescriptionRequest } from '../models/prescription-request.model';
import { PrescriptionResponse } from '../models/prescription-response.model';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private apiUrl = 'http://localhost:8080/api/prescriptions';

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
}
