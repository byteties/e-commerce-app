import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return access_token, if credentials correct', async () => {
      const mockUser = { id: 1, username: 'admin' };
      const mockToken = { access_token: 'mocked-token' };

      (authService.validateUser as jest.Mock).mockResolvedValue(mockUser);
      (authService.login as jest.Mock).mockResolvedValue(mockToken);

      const result = await controller.login({ username: 'admin', password: '123456' });

      expect(authService.validateUser).toHaveBeenCalledWith('admin', '123456');
      expect(authService.login).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockToken);
    });

    it('should throw UnauthorizedException, if credentials invalid', async () => {
      (authService.validateUser as jest.Mock).mockResolvedValue(null);

      await expect(controller.login({ username: 'admin', password: 'wrong' }))
        .rejects
        .toThrow(UnauthorizedException);

      expect(authService.validateUser).toHaveBeenCalledWith('admin', 'wrong');
    });
  });
});
