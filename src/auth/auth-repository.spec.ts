import { Test, TestingModule } from '@nestjs/testing';
import { AuthRepository } from './auth-repository';
import { CreateAccountDto } from './models/dto/create-account.dto';
import { Role } from './models/user';
jest.mock('firebase-admin', () => ({
  auth: () => ({
    createUser: jest
      .fn()
      .mockImplementation(async (data) => ({ uid: 'mockUid' })),
    setCustomUserClaims: jest
      .fn()
      .mockImplementation(async (uid, data) => ({ uid: 'mockUid' })),
    verifyIdToken: jest.fn().mockImplementation(async (token) => {
      if (token === 'mockToken') return { claims: { mock: 'mock' } };
      else throw { message: 'Incorrect Token' };
    }),
  }),
}));

jest.mock('fireorm', () => ({
  getRepository: (type) => ({
    create: jest
      .fn()
      .mockImplementation(async (data) => ({ ...data, id: 'mockId' })),
  }),
  Collection: () => jest.fn(),
}));
describe('AuthRepository', () => {
  let provider: AuthRepository;
  let mockUser: CreateAccountDto;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthRepository],
    }).compile();

    provider = module.get<AuthRepository>(AuthRepository);
    mockUser = {
      displayName: 'Mock User',
      email: 'mock@mock.com',
      password: 'mockPassword',
      role: Role.USER,
    };
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('createAccount', () => {
    it('should create account succesfully', async () => {
      const result = await provider.createAccount(mockUser);
      const { password, ...expectedResult } = mockUser;
      expect(result).toStrictEqual({
        ...expectedResult,
        id: 'mockId',
      });
    });
  });

  describe('authenticate', () => {
    it('should return normally with correct token', async () => {
      const result = await provider.authenticate('mockToken');
      expect(result).toStrictEqual({ claims: { mock: 'mock' } });
    });
    it('should throw an error with incorrect token', async () => {
      provider
        .authenticate('incorrect')
        .catch((error) => expect(error).toBeDefined());
    });
  });
});
