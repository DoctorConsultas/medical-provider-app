import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service'; 
import { PatientResponse } from '../../../models/patient-response.model'; 

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent implements OnInit {
  patients: PatientResponse[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.getAll().subscribe((data: PatientResponse[]) => {
      this.patients = data;
    });
  }

  deletePatient(id: string): void {
    this.patientService.delete(id).subscribe(() => {
      this.patients = this.patients.filter(patient => patient.id !== id);
    });
  }

  editPatient(id: string): void {
    // Implement navigation to edit form
  }
}

