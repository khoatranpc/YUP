export enum TeacherStatus {
  ACTIVE = 'ACTIVE',
  DEACTIVE = 'DEACTIVE',
  PENDING = 'PENDING',
}

export enum TeacherGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NA = 'NA',
}
export interface Teacher {
  _id: string;
  name: string;
  email: string;
  gender: TeacherGender;
  dob?: string;
  address?: string;
  phone?: string;
  background?: string;
  imageUrl?: string;
  bankAccount?: {
    bankName: string;
    accountName: string;
    accountNo: string;
  };
  socials?: {
    serviceName: string;
    link: string;
  }[];
  department: string;
  isOldStudent: boolean;
  timeStart?: string;
  skills: string[];
  status: TeacherStatus;
}
