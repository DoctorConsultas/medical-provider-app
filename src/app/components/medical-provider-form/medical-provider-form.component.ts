import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalProviderService } from '../../services/medical-provider.service';
import { MedicalProviderRequest } from '../../models/medical-provider-request.model';
import { MedicalProviderResponse } from '../../models/medical-provider-response.model';

@Component({
  selector: 'app-medical-provider-form',
  templateUrl: './medical-provider-form.component.html',
  styleUrls: ['./medical-provider-form.component.css']
})
export class MedicalProviderFormComponent implements OnInit {
  provider: MedicalProviderRequest = {
    medicalProviderTypeId: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    businessName: '',
    rut: '',
    status: ''
  };
  providerId: string | null = null;
  isEdit: boolean = false;

  constructor(
    private providerService: MedicalProviderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.providerId = id;
      this.providerService.getById(id).subscribe((data: MedicalProviderResponse) => {
        this.provider = { ...data, password: '' }; // Asegúrate de manejar la contraseña correctamente
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit && this.providerId) {
      this.providerService.update(this.providerId, this.provider).subscribe(() => {
        this.router.navigate(['/medical-providers']);
      });
    } else {
      this.providerService.create(this.provider).subscribe(() => {
        this.router.navigate(['/medical-providers']);
      });
    }
  }
}
