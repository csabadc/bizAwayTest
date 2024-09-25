import { Test, TestingModule } from '@nestjs/testing';
import { PlaceModule } from '../place.module';
import { PlaceService } from '../place.service';
import { getModelToken } from '@nestjs/mongoose';

describe('PlaceModule', () => {
  let placeService: PlaceService;

  const mockPlaceService = {
    findAll: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PlaceModule],
    })
      .overrideProvider(getModelToken('Place'))
      .useValue(mockPlaceService)
      .compile();

    placeService = module.get<PlaceService>(PlaceService);
  });

  it('should be defined', () => {
    expect(placeService).toBeDefined();
  });
});
