export interface CreateTeacherDto {
  name: string;
  email: string;
  gender: 'M' | 'F' | 'NA';
  bankingInfo: {
    bank: string;
    accountNo: string;
    accountName: string;
  };
}
