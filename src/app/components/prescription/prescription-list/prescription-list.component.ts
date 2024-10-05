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

  page!: number;
  size!: number;

  currentFirstRow: number = 0;
  prescriptions: PrescriptionResponse[] = [];
  medics: MedicResponse[] = [];
  patients: PatientResponse[] = [];
  filteredMedics: MedicResponse[] = [];
  filteredPatients: PatientResponse[] = [];
  totalRecords!: number;
  loading: boolean = true;
  medicalProviderId: string = '';
  filterValueMedic: string | undefined = '';
  filterValuePatien: string | undefined = '';
  selectedDoctor!: MedicResponse;
  selectedPatient!: PatientResponse;
  medicId: string = '';
  patientId: string = '';
  rangeDates: Date[] | undefined;
  downloadBy: string = '';
  pageable: any;
  numberOfElements!: number;
  statuses: any[] = [
    { name: 'Estado', key: 'ALL' },
    { name: 'Disponible', key: 'AVAILABLE' },
    { name: 'Dispensada', key: 'DISPENSED' }
  ];
  selectedStatus: any = this.statuses[0]; // Inicialmente seleccionado "Todos"
  selectStatuses: string[] = this.statuses.map(status => status.key).filter(key => key !== 'ALL'); // Inicialmente todos los estados

  defaultMedic: MedicResponse = {
    id: 'all',
    name: 'Médico',
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
    name: 'Paciente',
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
  ) { }

  ngOnInit(): void {
    this.searchMedics(this.medicalProviderId, ''); // Initial load
    this.getPatientsByMedicalProvider(this.medicalProviderId);

    // Subscribe to the user observable to get the email
 
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

    this.page = event.first / event.rows;
    this.size = event.rows;

    console.log("this.page: " + this.page + "  --  " + "this.size: " + this.size );

    // Check if rangeDates is defined and has two dates
    const startDate = this.rangeDates && this.rangeDates.length === 2 ? this.formatDate(this.rangeDates[0]) : undefined;
    const endDate = this.rangeDates && this.rangeDates.length === 2 ? this.formatDate(this.rangeDates[1]) : undefined;

    var medicId = this.medicId
    if(this.medicId == '' || this.medicId == 'all') {
      medicId = '';
    }
    var patientId = this.patientId
    if(this.patientId == '' || this.patientId == 'all') {
      patientId = '';
    }
 
    this.prescriptionService.getPrescriptionsByFilters(this.selectStatuses, medicId, patientId, startDate, endDate, this.page, this.size)
      .subscribe(data => {
        this.prescriptions = data.content.map((prescription: any) => ({
          ...prescription,
          patientDocument: prescription.patientDocument ? JSON.parse(prescription.patientDocument) : null,
        }));
        this.totalRecords = data.totalElements;
        this.pageable = data.pageable;
        this.numberOfElements = data.numberOfElements;
        this.loading = false;
      }, error => {
        console.error('Error fetching prescriptions by patient', error);
        this.loading = false;
      });
    
  }

  updateSelectedStatuses(event: any): void {
    if (this.selectedStatus.key === 'ALL') {
      this.selectStatuses = this.statuses.map(status => status.key).filter(key => key !== 'ALL');
    } else {
      this.selectStatuses = [this.selectedStatus.key];
    }
    this.refreshTable();
  }

  onDoctorSelect(event: any): void {
    const selectedDoctor = event.value != null ? event.value : 'all';
    this.medicId = selectedDoctor.id !== 'all' ? selectedDoctor.id : '';
  //  this.selectedPatient = this.defaultPatient;
  //  this.filterValuePatien = '';
  //  this.rangeDates = [];
    this.prescriptions = [];
  //  this.patientId = 'all';
    this.currentFirstRow = 0;
    this.loading = false;
    this.loadPrescriptions({ first: 0, rows: this.size });
  }

  onPatienSelect(event: any): void {
    const selectedPatient = event.value != null ? event.value : 'all';
    this.patientId = selectedPatient.id !== 'all' ? selectedPatient.id : '';
  //  this.selectedDoctor = this.defaultMedic;
  //  this.filterValueMedic = '';
  //  this.rangeDates = [];
    this.prescriptions = [];
  //  this.medicId = 'all';
    this.currentFirstRow = 0;
    this.loading = false;
    this.loadPrescriptions({ first: 0, rows: this.size });
  }

  onDateSelect() {
    if (this.rangeDates && this.rangeDates.length === 2 && this.rangeDates[0] && this.rangeDates[1]) {
      const startDate = this.formatDate(this.rangeDates[0]);
      const endDate = this.formatDate(this.rangeDates[1]);
    //  this.medicId = 'all';
    //  this.patientId = 'all';
    //  this.selectedDoctor = this.defaultMedic;
    //  this.selectedPatient = this.defaultPatient;
    //  this.filterValueMedic = '';
    //  this.filterValuePatien = '';
      this.prescriptions = [];
        this.currentFirstRow = 0;
        this.loading = false;
      this.loadPrescriptions({ first: 0, rows: this.size });
    }
  }

  resetFunctionRangeDates() {
    this.rangeDates = [];
    this.prescriptions = [];
  //  this.medicId = 'all';
    this.currentFirstRow = 0;
    this.loading = false;
    this.loadPrescriptions({ first: 0, rows: this.size });
  }

  resetState() {
    console.log(this.selectStatuses = this.statuses.map(status => status.key).filter(key => key !== 'ALL'));
    this.selectedStatus = 'ALL'
    this.selectStatuses = this.statuses.map(status => status.key).filter(key => key !== 'ALL');
    this.prescriptions = [];
    this.currentFirstRow = 0;
    this.loading = false;
    this.loadPrescriptions({ first: 0, rows: this.size });
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
    this.currentFirstRow = 0;
    this.loading = false;
  }

  resetFunctionPatien(options: DropdownFilterOptions): void {
    if (options && options.reset) {
      options.reset();
      this.filterValuePatien = '';
    }
    this.currentFirstRow = 0;
    this.loading = false;
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
          this.downloadBy = "DATE_RANGE";
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
    this.currentFirstRow = 0;
    this.loading = false;
    this.loadPrescriptions({ first: 0, rows: this.size });
  }

  downloadExcel(): void {
    // Check if rangeDates is defined and has two dates
    const startDate = this.rangeDates && this.rangeDates.length === 2 ? this.formatDate(this.rangeDates[0]) : undefined;
    const endDate = this.rangeDates && this.rangeDates.length === 2 ? this.formatDate(this.rangeDates[1]) : undefined;

    var medicId = this.medicId
    if(this.medicId == '' || this.medicId == 'all') {
      medicId = '';
    }
    var patientId = this.patientId
    if(this.patientId == '' || this.patientId == 'all') {
      patientId = '';
    }

    this.prescriptionService
      .downloadExcel(this.selectStatuses, medicId, patientId, startDate, endDate)
      .subscribe((data) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'prescriptions.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  }
}
