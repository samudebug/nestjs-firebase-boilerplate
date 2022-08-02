import { Collection } from 'fireorm';

@Collection()
export class User {
  id: string;
  displayName: string;
  email: string;
  role: Role;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
