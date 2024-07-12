export interface MedicResponse {
    id: string;
    name: string;
    lastname: string;
    gender?: string;
    email: string;
    password: string;
    phone: string;
    document: string;
    birthdate: string;
    addressCountryId?: string;
    addressLocalityId?: string;
    addressStreet?: string;
    addressNumber?: string;
    addressComments?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    cjp: string;
    passwordForgotCode?: string;
    status: string;
    especialityId?: string;
    medicalProviderId?: string;
  }
  