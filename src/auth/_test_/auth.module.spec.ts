import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth.module';

describe('AuthModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();
  });

  it('should create the module', () => {
    expect(module).toBeDefined();
  });
});
