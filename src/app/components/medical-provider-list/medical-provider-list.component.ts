import { Component, OnInit } from '@angular/core';
import { MedicalProviderService } from '../../services/medical-provider.service';
import { MedicalProviderResponse } from '../../models/medical-provider-response.model';

@Component({
  selector: 'app-medical-provider-list',
  templateUrl: 'medical-provider-list.component.html',
  styleUrls: ['medical-provider-list.component.css']
})
export class MedicalProviderListComponent implements OnInit {
  providers: MedicalProviderResponse[] = [];

  constructor(private providerService: MedicalProviderService) { }

  ngOnInit(): void {
    this.providerService.getAll().subscribe((data: MedicalProviderResponse[]) => {
      this.providers = data;
    });
  }

  deleteProvider(id: string): void {
    this.providerService.delete(id).subscribe(() => {
      this.providers = this.providers.filter(provider => provider.id !== id);
    });
  }

  editProvider(id: string): void {
    // Implement navigation to edit form
  }
}
