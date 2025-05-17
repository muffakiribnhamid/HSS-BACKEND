export interface AdmissionDto {
  id?: number;
  fullName: string;
  address: string;
  dob: string;
  motherName: string;
  fatherName: string;
  email: string;
  phone: string;

  gradeApplyingFor: string;
  previousSchool: string;
  lastGradeCompleted: string;
  shortIntroduction: string;

  accountHolderName: string;
  accountNumber: number;
  bankName: string;
  IFSCCode: string;

  photo: string;
  marksheet: string;
  aadhaarCard: string;

  activeStatus: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
