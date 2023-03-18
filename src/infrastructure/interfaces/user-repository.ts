import { User } from '@/entities/user'

export interface UserRepository {
  save(user: User): Promise<void>
  remove(user_email: string): Promise<void>
  findByEmail(user_email: string): Promise<User | undefined>
  setStatus(status: string): void;
}