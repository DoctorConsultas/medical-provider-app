import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicRequest } from '../models/medic-request.model';
import { MedicResponse } from '../models/medic-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicService {
  private Url = environment.apiUrl;
  private apiUrl = `${this.Url}/medics`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<MedicResponse[]> {
    return this.http.get<MedicResponse[]>(this.apiUrl);
  }

  getById(id: string): Observable<MedicResponse> {
    return this.http.get<MedicResponse>(`${this.apiUrl}/${id}`);
  }

  create(medic: MedicRequest): Observable<MedicResponse> {
    return this.http.post<MedicResponse>(this.apiUrl, medic);
  }

  update(id: string, medic: MedicRequest): Observable<MedicResponse> {
    return this.http.put<MedicResponse>(`${this.apiUrl}/${id}`, medic);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  search(medicalProviderId: string, searchCriteria: string): Observable<MedicResponse[]> {
    const searchUrl = `${this.apiUrl}/search?medicalProviderId=${medicalProviderId}&searchCriteria=${searchCriteria}`;
    return this.http.get<MedicResponse[]>(searchUrl);
  }
}
