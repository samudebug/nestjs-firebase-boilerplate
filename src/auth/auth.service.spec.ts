import { Test, TestingModule } from '@nestjs/testing';
import { AuthRepository } from './auth-repository';
import { AuthService } from './auth.service';
import { Role } from './models/user';
const mockUserRepository = () => ({
  createAccount: jest.fn(),
});
describe('AuthService', () => {
  let service: AuthService;
  let authRepository;
  let mockUser;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authRepository = module.get<AuthRepository>(AuthRepository);
    mockUser = {
      displayName: 'Mock User',
      email: 'mock@mock.com',
      password: 'mockPassword',
      role: Role.USER,
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(authRepository).toBeDefined();
  });

  describe('createAccount', () => {
    it('should create an user normally', async () => {
      authRepository.createAccount.mockResolvedValue({ id: 'mockId' });
      const result = await service.createAccount(mockUser);
      expect(result).toStrictEqual({ id: 'mockId' });
    });
    it('should throw an error with incorrect user info', async () => {
      authRepository.createAccount.mockRejectedValue('a');
      service
        .createAccount({
          displayName: '',
          email: '',
          password: '',
          role: Role.USER,
        })
        .catch((err) => expect(err).toBeDefined());
    });
  });
});
