import { Component, OnInit } from '@angular/core';
import { MedicService } from '../../services/medic.service';
import { MedicResponse } from '../../models/medic-response.model';

@Component({
  selector: 'app-medic-list',
  templateUrl: 'medic-list.component.html',
  styleUrls: ['medic-list.component.css']
})
export class MedicListComponent implements OnInit {
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
