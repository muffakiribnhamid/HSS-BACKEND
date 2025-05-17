export interface TeacherRecordDTO {
  id?: number;
  fullName: string;
  address: string;
  email: string;
  contact: string;
  activeStatus: Boolean;
  createdAt?: Date;
  editedAt?: Date;
}
