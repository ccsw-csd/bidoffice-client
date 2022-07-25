export class User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;

  constructor(id: number, username: string, email: string, firstName: string, lastName: string, role: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}
