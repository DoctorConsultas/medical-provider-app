export interface PrescriptionResponse {
  id: string;
  expireAt: string;
  medicId: string;
  medicCjp: string;
  medicName: string;
  medicLastname: string;
  patientId: string;
  patientDocument: Document | null;
  patientName: string;
  patientLastname: string;
  code: string;
  status: string;
  dose: number;
  doseUnit: string;
  frecuency: number;
  frecuencyUnit: string;
  medicalHistory: string | null;
  affections: string | null;
  duration: number;
  durationUnit: string;
  productType: string;
  productId: string;
  doseType: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  link: string;
  medicLink: string;
  patientLink: string;
  ampDsc: String;
  prodMsp: String;
  nombreLaboratory: String;
  rutLaboratory: String;
  pharmacyId: string;
  pharmacyName: string;
}


export interface Document {
  number: string;
  type: string;
}
