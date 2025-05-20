export interface StudentRecordDto {
  id?: number;
  fullName: string;
  class: string;
  roll: string;
  address: string;
  email: string;
  contact: string;
  activeStatus: Boolean;
  createdAt?: Date;
  editedAt?: Date;
}
