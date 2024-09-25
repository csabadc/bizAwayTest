import { Test, TestingModule } from '@nestjs/testing';
import { TripAvailabilityModule } from '../trip-availability.module';
import { TripAvailabilityService } from '../trip-availability.service';
import { getModelToken } from '@nestjs/mongoose';
import { AuthGuard } from '../../auth/auth.guard';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

describe('TripAvailabilityModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TripAvailabilityModule],
    })
      .overrideProvider(getModelToken('Place'))
      .useValue({})
      .overrideGuard(AuthGuard)
      .useValue({})
      .overrideProvider(CACHE_MANAGER)
      .useValue({})
      .overrideProvider(HttpService)
      .useValue({})
      .overrideProvider(ConfigService)
      .useValue({})
      .compile();
  });

  it('should provide TripAvailabilityService', () => {
    const tripAvailabilityService = module.get<TripAvailabilityService>(
      TripAvailabilityService,
    );
    expect(tripAvailabilityService).toBeDefined();
  });
});
