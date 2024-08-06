import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { PrescriptionService } from '../../../services/prescription.service'; 
import { PrescriptionResponse, Document } from '../../../models/prescription-response.model'; 
import { MedicService } from '../../../services/medic.service';
import { MedicResponse } from '../../../models/medic-response.model';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { PatientService } from '../../../services/patient.service';
import { PatientResponse } from '../../../models/patient-response.model';
import { DateTimeFormatPipe } from '../../../pipe/date-time-format-pipe';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.scss']
})
export class PrescriptionListComponent implements OnInit {
  prescriptions: PrescriptionResponse[] = [];
  medics: MedicResponse[] = [];
  patients: PatientResponse[] = [];
  filteredMedics: MedicResponse[] = [];
  filteredPatients: PatientResponse[] = [];
  totalRecords!: number;
  loading: boolean = true;
  medicalProviderId: string = '39';
  filterValueMedic: string | undefined = '';
  filterValuePatien: string | undefined = '';
  selectedDoctor!: MedicResponse;
  selectedPatient!: PatientResponse;
  medicId: string = '';
  patientId: string = '';
  rangeDates: Date[] | undefined;
  statuses: any[] = [
    { name: 'Disponible', key: 'AVAILABLE' },
    { name: 'Dispensada', key: 'DISPENSED' }
  ];
  selectStatusesAUX: any[] = this.statuses; // Initialize with all statuses selected
  selectStatuses: string[] = this.statuses.map(status => status.key);

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

  defaultPatient: PatientResponse = {
    id: 'all',
    name: 'All Patients',
    lastname: '',
    email: '',
    phone: '',
    document: '',
    addressCountryId: '',
    addressLocalityId: '',
    addressStreet: '',
    addressNumber: '',
    addressComments: '',
    user: '',
    password: '',
    birthdate: '',
    createdAt: '',
    updatedAt: '',
    sex: '',
    avatarId: '',
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
    this.getPatientsByMedicalProvider(this.medicalProviderId);
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

  getPatientsByMedicalProvider(medicalProviderId: string): void {
    this.patientService.getPatiensByMedicalProvider(medicalProviderId).subscribe(
      (data: PatientResponse[]) => {
        this.zone.run(() => {
          this.patients = [this.defaultPatient, ...data];
          this.filteredPatients = this.patients;
         });
      },
      error => {
        console.error('Error fetching patients', error);
      }
    );
  }

  loadPrescriptions(event: any): void {
    this.loading = true;

    const page = event.first / event.rows;
    const size = event.rows;

    if (this.medicId && this.medicId !== 'all') {
      this.prescriptionService.getPrescriptionsByMedicIdAndMedicalProviderId(this.medicId, this.medicalProviderId, this.selectStatuses, page, size)
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
    } else if (this.patientId && this.patientId !== 'all') {
      this.prescriptionService.getPrescriptionsByPatientIdAndMedicalProviderId(this.patientId, this.medicalProviderId, this.selectStatuses, page, size)
        .subscribe(data => {
          this.prescriptions = data.content.map((prescription: any) => ({
            ...prescription,
            patientDocument: prescription.patientDocument ? JSON.parse(prescription.patientDocument) : null,
          }));
          this.totalRecords = data.totalElements;
          this.loading = false;
        }, error => {
          console.error('Error fetching prescriptions by patient', error);
          this.loading = false;
        });
    } else if (this.rangeDates && this.rangeDates.length === 2 && this.rangeDates[0] && this.rangeDates[1]) {
      const startDate = this.formatDate(this.rangeDates[0]);
      const endDate = this.formatDate(this.rangeDates[1]);
      this.fetchPrescriptionsByDateRange(this.medicalProviderId, startDate, endDate, this.selectStatuses, page, size);
    } else {
      this.prescriptionService.getPrescriptionsByMedicalProviderId(this.medicalProviderId, this.selectStatuses, page, size)
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

  updateSelectedStatuses(): void {
    if (this.selectStatusesAUX.length === 0) {
      // Ensure at least one status is selected, revert to default if all are unchecked
      this.selectStatusesAUX = [...this.statuses];
    }
    this.selectStatuses = this.selectStatusesAUX.map(status => status.key);
  }
  
  onDoctorSelect(event: any): void {
    const selectedDoctor = event.value;
    this.medicId = selectedDoctor.id !== 'all' ? selectedDoctor.id : '';
    this.selectedPatient = this.defaultPatient;
    this.filterValuePatien = '';
    this.rangeDates = [];
    this.prescriptions = [];
    this.patientId = 'all';
    this.loadPrescriptions({ first: 0, rows: 15 });
  }

  onPatienSelect(event: any): void {
    const selectedPatient = event.value;
    this.patientId = selectedPatient.id !== 'all' ? selectedPatient.id : '';
    this.selectedDoctor = this.defaultMedic;
    this.filterValueMedic = '';
    this.rangeDates = [];
    this.prescriptions = [];
    this.medicId = 'all';
    this.loadPrescriptions({ first: 0, rows: 15 });
  }

  onDateSelect() {
    if (this.rangeDates && this.rangeDates.length === 2 && this.rangeDates[0] && this.rangeDates[1]) {
      const startDate = this.formatDate(this.rangeDates[0]);
      const endDate = this.formatDate(this.rangeDates[1]);
      this.medicId = 'all';
      this.patientId = 'all';
      this.selectedDoctor = this.defaultMedic;
      this.selectedPatient = this.defaultPatient;
      this.filterValueMedic = '';
      this.filterValuePatien = '';
      this.prescriptions = [];
      this.loadPrescriptions({ first: 0, rows: 15 });
    }
  }

  onFilterMedic(event: any): void {
    const searchCriteria = event.filter;
    this.searchMedics(this.medicalProviderId, searchCriteria);
  }

  onFilterPatien(event: any): void {
    const searchCriteria = event.filter;
    this.getPatientsByMedicalProvider(this.medicalProviderId);
  }

  resetFunctionMedic(options: DropdownFilterOptions): void {
    if (options && options.reset) {
      options.reset();
      this.filterValueMedic = '';
    }
  }

  resetFunctionPatien(options: DropdownFilterOptions): void {
    if (options && options.reset) {
      options.reset();
      this.filterValuePatien = '';
    }
  }

  customFilterMedic(event: KeyboardEvent, options: DropdownFilterOptions): void {
    const target = event.target as HTMLInputElement;
    const filterValueMedic = target.value;
    if (options && options.filter) {
      options.filter(event);
    }
  }

  customFilterPatien(event: KeyboardEvent, options: DropdownFilterOptions): void {
    const target = event.target as HTMLInputElement;
    const filterValuePatien = target.value;

    if (options && options.filter) {
      options.filter(event);
    }
  }

  fetchPrescriptionsByDateRange(medicalProviderId: string, startDate: string, endDate: string, selectStatuses: string[], page: number, size: number): void {
    this.prescriptionService.getPrescriptionsByMedicalProviderAndDateRange(medicalProviderId, startDate, endDate, selectStatuses, page, size)
      .subscribe(
        data => {
          this.prescriptions = data.content;
          this.totalRecords = data.totalElements;
          this.loading = false;
        },
        error => {
          console.error('Error fetching prescriptions', error);
          this.loading = false;
        }
      );
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'AVAILABLE':
        return 'Disponible';
      case 'DISPENSED':
        return 'Dispensada';
      default:
        return status;
    }
  }

  refreshTable(): void {
    // this.medicId = 'all';
    // this.patientId = 'all';
    // this.selectedDoctor = this.defaultMedic;
    // this.selectedPatient = this.defaultPatient;
    // this.filterValueMedic = '';
    // this.filterValuePatien = '';
    // this.prescriptions = [];
    // this.rangeDates = [];
    this.loadPrescriptions({ first: 0, rows: 15 });
  }
}
