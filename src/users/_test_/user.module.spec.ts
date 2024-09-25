import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users.module';
import { UsersService } from '../users.service';

describe('UsersModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();
  });

  it('should provide UsersService', () => {
    const usersService = module.get<UsersService>(UsersService);
    expect(usersService).toBeDefined();
  });
});
