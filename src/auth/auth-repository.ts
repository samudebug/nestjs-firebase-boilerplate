import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { BaseFirestoreRepository, getRepository } from 'fireorm';
import { CreateAccountDto } from './models/dto/create-account.dto';
import { User } from './models/user';
@Injectable()
export class AuthRepository {
  auth = admin.auth();
  userRepo: BaseFirestoreRepository<User>;
  constructor() {
    this.userRepo = getRepository(User);
  }

  async createAccount(createAccountDto: CreateAccountDto) {
    const newUser = await this.auth.createUser({
      displayName: createAccountDto.displayName,
      email: createAccountDto.email,
      password: createAccountDto.password,
    });
    await this.auth.setCustomUserClaims(newUser.uid, {
      role: createAccountDto.role,
    });
    const returnUser = await this.userRepo.create({
      displayName: createAccountDto.displayName,
      email: createAccountDto.email,
      role: createAccountDto.role,
    });
    return returnUser;
  }

  async authenticate(token: string) {
    return await this.auth.verifyIdToken(token);
  }
}
