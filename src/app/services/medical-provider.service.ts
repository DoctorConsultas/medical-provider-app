import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicalProviderRequest } from '../models/medical-provider-request.model';
import { MedicalProviderResponse } from '../models/medical-provider-response.model';

@Injectable({
  providedIn: 'root'
})
export class MedicalProviderService {
  private apiUrl = 'http://localhost:8080/api/medical-providers';

  constructor(private http: HttpClient) { }

  getAll(): Observable<MedicalProviderResponse[]> {
    return this.http.get<MedicalProviderResponse[]>(this.apiUrl);
  }

  getById(id: string): Observable<MedicalProviderResponse> {
    return this.http.get<MedicalProviderResponse>(`${this.apiUrl}/${id}`);
  }

  create(provider: MedicalProviderRequest): Observable<MedicalProviderResponse> {
    return this.http.post<MedicalProviderResponse>(this.apiUrl, provider);
  }

  update(id: string, provider: MedicalProviderRequest): Observable<MedicalProviderResponse> {
    return this.http.put<MedicalProviderResponse>(`${this.apiUrl}/${id}`, provider);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
