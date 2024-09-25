import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signIn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    it('should call signIn method of AuthService and return the result', async () => {
      const signInDto = { username: 'testuser', password: 'password123' };
      const result = { accessToken: 'someToken' };
      mockAuthService.signIn.mockResolvedValue(result);
      const response = await authController.signIn(signInDto);
      expect(authService.signIn).toHaveBeenCalledWith(
        signInDto.username,
        signInDto.password,
      );
      expect(response).toEqual(result);
    });

    it('should handle errors from AuthService', async () => {
      const signInDto = { username: 'testuser', password: 'wrongpassword' };
      mockAuthService.signIn.mockRejectedValue(
        new Error('Invalid credentials'),
      );

      await expect(authController.signIn(signInDto)).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });
});
