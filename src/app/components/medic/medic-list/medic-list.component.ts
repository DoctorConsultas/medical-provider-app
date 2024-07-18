import { Component } from '@angular/core';
import { MedicResponse } from '../../../models/medic-response.model';
import { MedicService } from '../../../services/medic.service';

@Component({
  selector: 'app-medic-list',
  templateUrl: './medic-list.component.html',
  styleUrl: './medic-list.component.scss'
})
export class MedicListComponent {
  medics: MedicResponse[] = [];

  constructor(private medicService: MedicService) { }

  ngOnInit(): void {
    this.medicService.getAll().subscribe((data: MedicResponse[]) => {
      this.medics = data;
    });
  }

  deleteMedic(id: string): void {
    this.medicService.delete(id).subscribe(() => {
      this.medics = this.medics.filter(medic => medic.id !== id);
    });
  }

  editMedic(id: string): void {
    // Implement navigation to edit form
  }
}
