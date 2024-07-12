import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicRequest } from '../models/medic-request.model';
import { MedicResponse } from '../models/medic-response.model';

@Injectable({
  providedIn: 'root'
})
export class MedicService {
  private apiUrl = 'http://localhost:8080/api/medics';

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
}
