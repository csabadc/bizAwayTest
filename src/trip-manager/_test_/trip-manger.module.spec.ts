import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TripManagerService } from '../trip-manager.service';
import { TripManagerController } from '../trip-manager.controller';
import { TripManagerModule } from '../trip-manager.module';
import { AuthGuard } from '../../auth/auth.guard';

describe('TripManagerModule', () => {
  let tripManagerService: TripManagerService;
  let tripManagerController: TripManagerController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TripManagerModule],
    })
      .overrideProvider(getModelToken('Trip'))
      .useValue({})
      .overrideGuard(AuthGuard)
      .useValue({})
      .compile();

    tripManagerService = module.get<TripManagerService>(TripManagerService);
    tripManagerController = module.get<TripManagerController>(
      TripManagerController,
    );
  });

  it('should be defined', () => {
    expect(tripManagerService).toBeDefined();
    expect(tripManagerController).toBeDefined();
  });
});
