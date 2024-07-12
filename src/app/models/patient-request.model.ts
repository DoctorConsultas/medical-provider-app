export interface PatientRequest {
    name: string;
    lastname: string;
    email?: string;
    phone: string;
    document: string;
    addressCountryId?: string;
    addressLocalityId?: string;
    addressStreet?: string;
    addressNumber?: string;
    addressComments?: string;
    user: string;
    password: string;
    birthdate: string;
    sex?: string;
    avatarId?: string;
  }
  