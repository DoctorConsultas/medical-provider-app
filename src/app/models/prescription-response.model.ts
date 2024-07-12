export interface PrescriptionResponse {
    id: string;
    expireAt?: string;
    medicId: string;
    patientId: string;
    code: string;
    status: string;
    dose?: number;
    doseUnit?: string;
    frecuency?: number;
    frecuencyUnit?: string;
    medicalHistory?: string;
    affections?: string;
    duration?: number;
    durationUnit?: string;
    productType: string;
    productId: string;
    doseType?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
  }
  