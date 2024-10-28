import { User } from './user';

export interface UserRepository {
  save(user: User): Promise<void>;

  findByName(name: string): Promise<User>;

  findAll(criteria: any): Promise<User[]>;
}
