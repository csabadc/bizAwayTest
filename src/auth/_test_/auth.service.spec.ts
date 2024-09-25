import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findOne: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signIn', () => {
    it('should return access_token when credentials are valid', async () => {
      const user = { userId: 1, username: 'test', password: 'testpass' };
      mockUsersService.findOne.mockResolvedValue(user);
      mockJwtService.signAsync.mockResolvedValue('token');

      const result = await authService.signIn('test', 'testpass');

      expect(result).toEqual({ access_token: 'token' });
      expect(usersService.findOne).toHaveBeenCalledWith('test');
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: user.userId,
        username: user.username,
      });
    });

    it('should throw UnauthorizedException when password is incorrect', async () => {
      const user = { userId: 1, username: 'test', password: 'testpass' };
      mockUsersService.findOne.mockResolvedValue(user);

      await expect(authService.signIn('test', 'wrongpass')).rejects.toThrow(
        UnauthorizedException,
      );
      expect(usersService.findOne).toHaveBeenCalledWith('test');
    });
  });
});
