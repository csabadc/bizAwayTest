import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TripManagerService } from '../trip-manager.service';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SaveTripDto } from '../dto/save-trip.dto';

describe('TripManagerService', () => {
  let service: TripManagerService;

  const mockTripDto: SaveTripDto = {
    origin: 'JFK',
    destination: 'LAX',
    cost: 300,
    duration: 6,
    type: 'car',
    id: 'trip1',
    display_name: 'JFK to LAX',
  };
  const mockTripModel = {
    create: jest.fn(),
    save: jest.fn(),
    findOneAndDelete: jest.fn(),
    find: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  const mockTripModelConstructor = jest.fn().mockImplementation(() => {
    return mockTripModel;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('saveTripDto', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          TripManagerService,
          {
            provide: getModelToken('Trip'),
            useValue: mockTripModelConstructor,
          },
        ],
      }).compile();

      service = module.get<TripManagerService>(TripManagerService);
    });
    it('should save a trip successfully', async () => {
      mockTripModel.save.mockResolvedValueOnce({});
      const result = await service.saveTripDto(mockTripDto, 'user1');
      expect(result).toEqual({ message: 'Trip successfully saved' });
      expect(mockTripModelConstructor).toHaveBeenCalledWith({
        ...mockTripDto,
        user: 'user1',
      });
      expect(mockTripModel.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an InternalServerErrorException if save fails', async () => {
      mockTripModel.save.mockRejectedValueOnce(new Error('Save failed'));
      await expect(service.saveTripDto(mockTripDto, 'user1')).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(mockTripModel.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteTrip', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          TripManagerService,
          {
            provide: getModelToken('Trip'),
            useValue: mockTripModel,
          },
        ],
      }).compile();

      service = module.get<TripManagerService>(TripManagerService);
    });
    it('should delete a trip successfully', async () => {
      mockTripModel.findOneAndDelete.mockResolvedValueOnce({ id: 'trip1' });
      const result = await service.deleteTrip('trip1', 'user1');
      expect(result).toEqual({ message: 'Trip successfully deleted' });
      expect(mockTripModel.findOneAndDelete).toHaveBeenCalledWith({
        id: 'trip1',
        user: 'user1',
      });
      expect(mockTripModel.findOneAndDelete).toHaveBeenCalledTimes(1);
    });

    it('should throw a NotFoundException if the trip does not exist', async () => {
      mockTripModel.findOneAndDelete.mockResolvedValueOnce(null);
      await expect(service.deleteTrip('trip1', 'user1')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockTripModel.findOneAndDelete).toHaveBeenCalledWith({
        id: 'trip1',
        user: 'user1',
      });
      expect(mockTripModel.findOneAndDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSavedTrips', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          TripManagerService,
          {
            provide: getModelToken('Trip'),
            useValue: mockTripModel,
          },
        ],
      }).compile();
      service = module.get<TripManagerService>(TripManagerService);
    });
    it('should return an array of saved trips', async () => {
      const trips = [
        { id: 'trip1', origin: 'JFK', destination: 'LAX' },
        { id: 'trip2', origin: 'SFO', destination: 'SEA' },
      ];

      mockTripModel.exec.mockResolvedValueOnce(trips);
      const result = await service.getSavedTrips('user1');
      expect(result).toEqual(trips);
      expect(mockTripModel.find).toHaveBeenCalledWith(
        { user: 'user1' },
        { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 },
      );
      expect(mockTripModel.exec).toHaveBeenCalledTimes(1);
    });
  });
});
