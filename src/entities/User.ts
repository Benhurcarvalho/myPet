import UserPassword from './UserPassword';

export type UserParams = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  clinicId: number;
};

export default class User {
  private id: number;
  private name: string;
  private email: string;
  private password: UserPassword;
  private role: string;
  private clinicId: number;

  constructor(params: UserParams) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.role = params.role;
    this.clinicId = params.clinicId;
    this.password = new UserPassword(params.password);
  }

  changePassword(password: string) {
    this.password = new UserPassword(password);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name.toUpperCase();
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password.getValue();
  }

  getRole() {
    return this.role;
  }

  getClinicId() {
    return this.clinicId;
  }
}