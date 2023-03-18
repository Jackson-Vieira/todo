import { UserRepository } from "../interfaces/user-repository";
import { User } from "@/entities/user";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async save(user: User): Promise<void> {
    const userExist = this.users.includes(user);
    if(userExist) {
      throw new Error("User already exists");
    }
    this.users.push(user);
  }

  async remove(user_email: string): Promise<void> {
    this.users = this.users.filter((u) => u.email !== user_email);
  }

  async findByEmail(user_email: string): Promise<User | undefined> {
    const user = this.users.find((u) => u.email === user_email);
    return Promise.resolve(user);
  }
}