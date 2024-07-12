export interface MedicRequest {
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
    cjp: string;
    passwordForgotCode?: string;
    status: string;
    especialityId?: string;
    medicalProviderId?: string;
  }
  