import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrescriptionService } from '../../services/prescription.service';
import { PrescriptionRequest } from '../../models/prescription-request.model';
import { PrescriptionResponse } from '../../models/prescription-response.model';

@Component({
  selector: 'app-prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrls: ['./prescription-form.component.css']
})
export class PrescriptionFormComponent implements OnInit {
  prescription: PrescriptionRequest = {
    medicId: '',
    patientId: '',
    code: '',
    status: '',
    productType: '',
    productId: ''
  };
  prescriptionId: string | null = null;
  isEdit: boolean = false;

  constructor(
    private prescriptionService: PrescriptionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.prescriptionId = id;
      this.prescriptionService.getById(id).subscribe((data: PrescriptionResponse) => {
        this.prescription = { ...data }; // No es necesario manejar la contraseña aquí
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit && this.prescriptionId) {
      this.prescriptionService.update(this.prescriptionId, this.prescription).subscribe(() => {
        this.router.navigate(['/prescriptions']);
      });
    } else {
      this.prescriptionService.create(this.prescription).subscribe(() => {
        this.router.navigate(['/prescriptions']);
      });
    }
  }
}
