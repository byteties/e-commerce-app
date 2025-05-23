import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(() => {
    usersService = {
      findOne: jest.fn(),
    } as any;

    jwtService = {
      sign: jest.fn(),
    } as any;

    authService = new AuthService(usersService, jwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user without password, if username and password correct', async () => {
      const mockUser = { id: 1, username: 'admin', password: '123456' };
      (usersService.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.validateUser('admin', '123456');
      expect(result).toEqual({ id: 1, username: 'admin' });
    });

    it('should return null, if password incorrect', async () => {
      const mockUser = { id: 1, username: 'admin', password: '123456' };
      (usersService.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.validateUser('admin', 'wrongpassword');
      expect(result).toBeNull();
    });

    it('should return null, if user not found', async () => {
      (usersService.findOne as jest.Mock).mockResolvedValue(undefined);

      const result = await authService.validateUser('ghost', 'any');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access_token', async () => {
      const mockUser = { id: 1, username: 'admin' };
      (jwtService.sign as jest.Mock).mockReturnValue('mocked-jwt-token');

      const result = await authService.login(mockUser);
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: 'admin',
        sub: 1,
      });
      expect(result).toEqual({ access_token: 'mocked-jwt-token' });
    });
  });
});
