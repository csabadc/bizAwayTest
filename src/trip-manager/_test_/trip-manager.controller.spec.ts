import { Test, TestingModule } from '@nestjs/testing';
import { TripManagerController } from '../trip-manager.controller';
import { TripManagerService } from '../trip-manager.service';
import { AuthGuard } from '../../auth/auth.guard';
import { SaveTripDto } from '../dto/save-trip.dto';
import { Trip } from '../../common/model/trip.model';

describe('TripManagerController', () => {
  let controller: TripManagerController;
  let service: TripManagerService;

  const mockTripManagerService = {
    getSavedTrips: jest.fn(),
    saveTripDto: jest.fn(),
    deleteTrip: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripManagerController],
      providers: [
        {
          provide: TripManagerService,
          useValue: mockTripManagerService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<TripManagerController>(TripManagerController);
    service = module.get<TripManagerService>(TripManagerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSavedTrips', () => {
    it('should return a list of saved trips', async () => {
      const mockTrips: Partial<Trip>[] = [
        {
          origin: 'NYC',
          destination: 'LA',
          cost: 300,
          duration: 6,
          type: 'car',
          id: 'trip1',
          display_name: 'NYC to LA',
        },
      ];

      mockTripManagerService.getSavedTrips.mockResolvedValue(mockTrips);

      const request = { user: { username: 'testUser' } } as any;
      const result = await controller.getSavedTrips(request);

      expect(result).toEqual(mockTrips);
      expect(service.getSavedTrips).toHaveBeenCalledWith('testUser');
    });
  });

  describe('saveTrip', () => {
    it('should save a trip and return a success message', async () => {
      const saveTripDto: SaveTripDto = {
        origin: 'NYC',
        destination: 'LA',
        cost: 300,
        duration: 6,
        type: 'car',
        id: 'trip1',
        display_name: 'NYC to LA',
      };

      const mockResponse = { message: 'Trip successfully saved' };
      mockTripManagerService.saveTripDto.mockResolvedValue(mockResponse);

      const request = { user: { username: 'testUser' } } as any;
      const result = await controller.saveTrip(saveTripDto, request);

      expect(result).toEqual(mockResponse);
      expect(service.saveTripDto).toHaveBeenCalledWith(saveTripDto, 'testUser');
    });
  });

  describe('deleteTrip', () => {
    it('should delete a trip', async () => {
      const tripId = 'trip1';
      const request = { user: { username: 'testUser' } } as any;

      const spy = jest
        .spyOn(service, 'deleteTrip')
        .mockResolvedValue(undefined);

      await controller.deleteTrip(tripId, request);

      expect(spy).toHaveBeenCalledWith(tripId, 'testUser');
    });
  });
});
