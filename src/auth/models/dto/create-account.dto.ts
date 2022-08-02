import { User } from '../user';

export interface CreateAccountDto extends Omit<User, 'id'> {
  password: string;
}
