import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth-repository';
import { CreateAccountDto } from './models/dto/create-account.dto';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}
  async createAccount(createAccountDto: CreateAccountDto) {
    return this.authRepository.createAccount(createAccountDto);
  }
}
