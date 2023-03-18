import { User } from "../entities/user";
import { UserRepository } from "../infrastructure/interfaces/user-repository";

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}
  async perform(user_email: string, name: string): Promise<User> {
    this.userRepository.setStatus("creating user...");
    const userExists = await this.userRepository.findByEmail(user_email);
    if (userExists) {
      this.userRepository.setStatus("ready");
      throw new Error("User already exists");
    }
    const user = new User(user_email, name);
    await this.userRepository.save(user);
    this.userRepository.setStatus("ready");
    return user;
  }
}
