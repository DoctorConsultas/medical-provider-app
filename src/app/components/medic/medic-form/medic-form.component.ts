import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicRequest } from '../../../models/medic-request.model';
import { MedicService } from '../../../services/medic.service';
import { MedicResponse } from '../../../models/medic-response.model';

@Component({
  selector: 'app-medic-form',
  templateUrl: './medic-form.component.html',
  styleUrl: './medic-form.component.scss'
})
export class MedicFormComponent implements OnInit {
  medic: MedicRequest = {
    name: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    document: '',
    birthdate: '',
    cjp: '',
    status: ''
  };
  medicId: string | null = null;
  isEdit: boolean = false;

  constructor(
    private medicService: MedicService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.medicId = id;
      this.medicService.getById(id).subscribe((data: MedicResponse) => {
        this.medic = { ...data, password: '' }; // Asegúrate de manejar la contraseña correctamente
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit && this.medicId) {
      this.medicService.update(this.medicId, this.medic).subscribe(() => {
        this.router.navigate(['/medics']);
      });
    } else {
      this.medicService.create(this.medic).subscribe(() => {
        this.router.navigate(['/medics']);
      });
    }
  }
}
