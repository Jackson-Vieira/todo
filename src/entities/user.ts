interface IUser {
  name: string;
  email: string;
}


export class User implements IUser {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}