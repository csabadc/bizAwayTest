import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user for a valid username', async () => {
      const user = await service.findOne('user1');
      expect(user).toEqual({
        username: 'user1',
        password: 'soStrongPassword',
      });
    });

    it('should return undefined for an invalid username', async () => {
      const user = await service.findOne('nonexistentUser');
      expect(user).toBeUndefined();
    });
  });
});
