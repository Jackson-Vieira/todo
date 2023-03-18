import { User } from "../entities/user";
import { UserRepository } from "../infrastructure/interfaces/user-repository";

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}
  async perform(user_email: string, name: string): Promise<User> {
    const userExists = await this.userRepository.findByEmail(user_email);
    if (userExists) {
      throw new Error("User already exists");
    }
    const user = new User(user_email, name);
    this.userRepository.save(user);
    return user
  }
}
