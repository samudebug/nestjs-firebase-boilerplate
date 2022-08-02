import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Role } from './models/user';
const mockAuthService = () => ({
  createAccount: jest.fn(),
});
describe('AuthController', () => {
  let controller: AuthController;
  let authService;
  let mockUser;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useFactory: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    mockUser = {
      displayName: 'Mock User',
      email: 'mock@mock.com',
      password: 'mockPassword',
      role: Role.USER,
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('createAccount', () => {
    it('should create an user normally', async () => {
      authService.createAccount.mockResolvedValue({ id: 'mockId' });
      const result = await controller.createAccount(mockUser);
      expect(result).toStrictEqual({ id: 'mockId' });
    });
    it('should throw an error with incorrect user info', async () => {
      authService.createAccount.mockRejectedValue('a');
      controller
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
