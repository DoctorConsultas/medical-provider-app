import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { PrescriptionService } from '../../../services/prescription.service'; 
import { PrescriptionResponse, Document } from '../../../models/prescription-response.model'; 
import { MedicService } from '../../../services/medic.service';
import { MedicResponse } from '../../../models/medic-response.model';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { PatientService } from '../../../services/patient.service';
import { PatientResponse } from '../../../models/patient-response.model';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.scss']
})
export class PrescriptionListComponent implements OnInit {
  prescriptions: PrescriptionResponse[] = [];
  medics: MedicResponse[] = [];
  patiens: PatientResponse[] = [];
  filteredMedics: MedicResponse[] = [];
  totalRecords!: number;
  loading: boolean = true;
  medicalProviderId: string = '39';
  filterValue: string | undefined = '';
  selectedDoctor!: MedicResponse;
  medicId: string = '';

  defaultMedic: MedicResponse = {
    id: 'all',
    name: 'All Doctors',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    document: '',
    birthdate: '',
    createdAt: '',
    updatedAt: '',
    cjp: '',
    status: '',
  };

  constructor(
    private prescriptionService: PrescriptionService,
    private medicService: MedicService,
    private patientService: PatientService,
    private zone: NgZone,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.searchMedics(this.medicalProviderId, ''); // Initial load
    this.getPatiensByMedicalProvider(this.medicalProviderId)
  }

  searchMedics(medicalProviderId: string, searchCriteria: string): void {
    this.medicService.search(medicalProviderId, searchCriteria).subscribe(
      (data: MedicResponse[]) => {
        this.zone.run(() => {
          this.medics = [this.defaultMedic, ...data];
          this.filteredMedics = this.medics;
        });
      },
      error => {
        console.error('Error fetching medics', error);
      }
    );
  }

  getPatiensByMedicalProvider(medicalProviderId: string): void {
    this.patientService.getPatiensByMedicalProvider(medicalProviderId).subscribe(
      (data: PatientResponse[]) => {
        this.zone.run(() => {
          this.patiens = data;
          console.log(this.patiens);
        });
      },
      error => {
        console.error('Error fetching medics', error);
      }
    );
  }

  loadPrescriptions(event: any): void {
    this.loading = true;
    if (this.medicId && this.medicId !== 'all') {
      this.prescriptionService.getPrescriptionsByMedicIdAndMedicalProviderId(this.medicId, this.medicalProviderId, event.first / event.rows, event.rows)
        .subscribe(data => {
          this.prescriptions = data.content.map((prescription: any) => ({
            ...prescription,
            patientDocument: prescription.patientDocument ? JSON.parse(prescription.patientDocument) : null,
          }));
          this.totalRecords = data.totalElements;
          this.loading = false;
        }, error => {
          console.error('Error fetching prescriptions by doctor', error);
          this.loading = false;
        });
    } else {
      this.prescriptionService.getPrescriptionsByMedicalProviderId(this.medicalProviderId, event.first / event.rows, event.rows)
        .subscribe(data => {
          this.prescriptions = data.content.map((prescription: any) => ({
            ...prescription,
            patientDocument: prescription.patientDocument ? JSON.parse(prescription.patientDocument) : null,
          }));
          this.totalRecords = data.totalElements;
          this.loading = false;
        }, error => {
          console.error('Error fetching prescriptions by medical provider', error);
          this.loading = false;
        });
    }
  }

  onDoctorSelect(event: any): void {
    const selectedDoctor = event.value;
    this.medicId = selectedDoctor.id !== 'all' ? selectedDoctor.id : '';
    this.loadPrescriptions({ first: 0, rows: 15 });
  }

  onFilter(event: any): void {
    const searchCriteria = event.filter;
    this.searchMedics(this.medicalProviderId, searchCriteria);
  }

  resetFunction(options: DropdownFilterOptions): void {
    if (options && options.reset) {
      options.reset();
      this.filterValue = '';
    }
  }

  customFilterFunction(event: KeyboardEvent, options: DropdownFilterOptions): void {
    const target = event.target as HTMLInputElement;
    const filterValue = target.value;
    console.log(filterValue);

    if (options && options.filter) {
      options.filter(event);
    }
  }
}
