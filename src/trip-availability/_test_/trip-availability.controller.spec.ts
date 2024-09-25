import { Test, TestingModule } from '@nestjs/testing';
import { TripAvailabilityController } from '../trip-availability.controller';
import { TripAvailabilityService } from '../trip-availability.service';
import { PlaceService } from '../../places/place.service';
import { AuthGuard } from '../../auth/auth.guard';
import { FindTripsDto, SortOptions } from '../dto/query-trip.dto';
import { BadRequestException } from '@nestjs/common';
import { Trip } from '../../common/model/trip.model';

describe('TripAvailabilityController', () => {
  let controller: TripAvailabilityController;
  let tripAvailabilityService: TripAvailabilityService;
  let placeService: PlaceService;

  const mockTrips: Partial<Trip>[] = [
    {
      origin: 'JFK',
      destination: 'LAX',
      cost: 300,
      duration: 5,
      type: 'car',
      id: 'trip1',
      display_name: 'NYC to LAX',
    },
  ];

  const mockPlaceService = {
    findPlacesByIATA: jest.fn(),
  };

  const mockTripAvailabilityService = {
    findTrips: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripAvailabilityController],
      providers: [
        {
          provide: TripAvailabilityService,
          useValue: mockTripAvailabilityService,
        },
        {
          provide: PlaceService,
          useValue: mockPlaceService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<TripAvailabilityController>(
      TripAvailabilityController,
    );
    tripAvailabilityService = module.get<TripAvailabilityService>(
      TripAvailabilityService,
    );
    placeService = module.get<PlaceService>(PlaceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findTrips', () => {
    it('should return a list of trips if IATA codes are valid', async () => {
      const query: FindTripsDto = {
        origin: 'JFK',
        destination: 'LAX',
        sort_by: SortOptions.cheapest,
      };

      mockPlaceService.findPlacesByIATA.mockResolvedValueOnce([
        { IATA: 'JFK' },
        { IATA: 'LAX' },
      ]);
      mockTripAvailabilityService.findTrips.mockResolvedValueOnce(mockTrips);

      const result = await controller.findTrips(query);

      expect(result).toEqual(mockTrips);
      expect(placeService.findPlacesByIATA).toHaveBeenCalledWith([
        'LAX',
        'JFK',
      ]);
      expect(tripAvailabilityService.findTrips).toHaveBeenCalledWith(query);
    });

    it('should throw BadRequestException if IATA codes are not valid', async () => {
      const query: FindTripsDto = {
        origin: 'JFK',
        destination: 'LAX',
        sort_by: SortOptions.cheapest,
      };

      mockPlaceService.findPlacesByIATA.mockResolvedValueOnce([
        { IATA: 'JFK' },
      ]);

      await expect(controller.findTrips(query)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
