import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Place } from '../model/place.model';
import { PlaceService } from '../place.service';

describe('PlaceService', () => {
  let placeService: PlaceService;
  let placeModel: Model<Place>;

  const mockPlaceModel = {
    find: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaceService,
        {
          provide: getModelToken('Place'),
          useValue: mockPlaceModel,
        },
      ],
    }).compile();

    placeService = module.get<PlaceService>(PlaceService);
    placeModel = module.get(getModelToken('Place'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findPlacesByIATA', () => {
    it('should return an array of places matching the IATA codes', async () => {
      const iataCodes = ['JFK', 'LAX'];
      const expectedPlaces = [
        { IATA: 'JFK', name: 'John F. Kennedy International Airport' },
        { IATA: 'LAX', name: 'Los Angeles International Airport' },
      ];

      mockPlaceModel.exec.mockResolvedValue(expectedPlaces);

      const result = await placeService.findPlacesByIATA(iataCodes);

      expect(result).toEqual(expectedPlaces);
      expect(placeModel.find).toHaveBeenCalledWith({
        IATA: { $in: iataCodes },
      });
    });

    it('should return an empty array if no places match the IATA codes', async () => {
      const iataCodes = ['XYZ'];
      mockPlaceModel.exec.mockResolvedValue([]);

      const result = await placeService.findPlacesByIATA(iataCodes);

      expect(result).toEqual([]);
      expect(placeModel.find).toHaveBeenCalledWith({
        IATA: { $in: iataCodes },
      });
    });
  });
});
