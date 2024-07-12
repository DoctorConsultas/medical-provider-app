// src/app/services/summary.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrescriptionResponse } from '../models/prescription-response.model';
import { PrescriptionService } from './prescription.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private prescriptionService: PrescriptionService) {}

  getMostPrescribedMedications(): Observable<{ product: string, count: number }[]> {
    return this.prescriptionService.getAll().pipe(
      map(prescriptions => {
        const productCounts = prescriptions.reduce((acc, prescription) => {
          acc[prescription.productId] = (acc[prescription.productId] || 0) + 1;
          return acc;
        }, {} as { [key: string]: number });

        return Object.keys(productCounts).map(product => ({
          product,
          count: productCounts[product]
        }));
      })
    );
  }

  getTopPrescribingMedics(): Observable<{ medicId: string, count: number }[]> {
    return this.prescriptionService.getAll().pipe(
      map(prescriptions => {
        const medicCounts = prescriptions.reduce((acc, prescription) => {
          acc[prescription.medicId] = (acc[prescription.medicId] || 0) + 1;
          return acc;
        }, {} as { [key: string]: number });

        return Object.keys(medicCounts).map(medicId => ({
          medicId,
          count: medicCounts[medicId]
        }));
      })
    );
  }

  getPatientPrescriptionsLastWeek(): Observable<number> {
    return this.prescriptionService.getAll().pipe(
      map(prescriptions => {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);

        return prescriptions.filter(prescription => new Date(prescription.createdAt) >= lastWeek).length;
      })
    );
  }
}
