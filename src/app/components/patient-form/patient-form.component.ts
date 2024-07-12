import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { PatientRequest } from '../../models/patient-request.model';
import { PatientResponse } from '../../models/patient-response.model';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {
  patient: PatientRequest = {
    name: '',
    lastname: '',
    email: '',
    phone: '',
    document: '',
    user: '',
    password: '',
    birthdate: ''
  };
  patientId: string | null = null;
  isEdit: boolean = false;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.patientId = id;
      this.patientService.getById(id).subscribe((data: PatientResponse) => {
        this.patient = { ...data, password: '' }; // Asegúrate de manejar la contraseña correctamente
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit && this.patientId) {
      this.patientService.update(this.patientId, this.patient).subscribe(() => {
        this.router.navigate(['/patients']);
      });
    } else {
      this.patientService.create(this.patient).subscribe(() => {
        this.router.navigate(['/patients']);
      });
    }
  }
}
