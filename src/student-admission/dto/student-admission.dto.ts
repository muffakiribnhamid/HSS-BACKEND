export interface AdmissionDto {
  fullName: string;
  address: string;
  dob: string; // should be in 'YYYY-MM-DD' format
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
}
