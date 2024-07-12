import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../../services/prescription.service';
import { PrescriptionResponse } from '../../models/prescription-response.model';

@Component({
  selector: 'app-prescription-list',
  templateUrl: 'prescription-list.component.html',
  styleUrls: ['prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {
  prescriptions: PrescriptionResponse[] = [];

  constructor(private prescriptionService: PrescriptionService) { }

  ngOnInit(): void {
    this.prescriptionService.getAll().subscribe((data: PrescriptionResponse[]) => {
      this.prescriptions = data;
    });
  }

  deletePrescription(id: string): void {
    this.prescriptionService.delete(id).subscribe(() => {
      this.prescriptions = this.prescriptions.filter(prescription => prescription.id !== id);
    });
  }

  editPrescription(id: string): void {
    // Implement navigation to edit form
  }
}
