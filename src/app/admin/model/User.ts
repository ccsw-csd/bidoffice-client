import {RoleClass} from "./RoleClass";

export class User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: RoleClass;

  public constructor(init?:Partial<User>) {
    Object.assign(this, init);
  }
}
