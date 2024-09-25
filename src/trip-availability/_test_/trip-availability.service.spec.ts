import { Test, TestingModule } from '@nestjs/testing';
import { TripAvailabilityService } from '../trip-availability.service';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { FindTripsDto, SortOptions } from '../dto/query-trip.dto';
import { Trip } from 'src/common/model/trip.model';
import { HttpException } from '@nestjs/common';

describe('TripAvailabilityService', () => {
  let service: TripAvailabilityService;
  let httpService: HttpService;
  let cacheManager: CacheStore;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripAvailabilityService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<TripAvailabilityService>(TripAvailabilityService);
    httpService = module.get<HttpService>(HttpService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findTrips', () => {
    const query: FindTripsDto = {
      origin: 'NYC',
      destination: 'LAX',
      sort_by: SortOptions.cheapest,
    };
    const cacheKey = `trips:${query.origin}:${query.destination}:${query.sort_by}`;
    const mockTrips: Partial<Trip>[] = [
      {
        origin: 'NYC',
        destination: 'LAX',
        cost: 200,
        duration: 5,
        type: 'flight',
        id: '1',
        display_name: 'Trip1',
      },
      {
        origin: 'NYC',
        destination: 'LAX',
        cost: 300,
        duration: 6,
        type: 'flight',
        id: '2',
        display_name: 'Trip2',
      },
    ];

    it('should return cached trips if available', async () => {
      mockCacheManager.get.mockResolvedValue(mockTrips);

      const result = await service.findTrips(query);

      expect(cacheManager.get).toHaveBeenCalledWith(cacheKey);
      expect(result).toEqual(mockTrips);
    });

    it('should fetch trips from API if not in cache and cache them', async () => {
      const axiosResponse: AxiosResponse<Trip[]> = {
        data: mockTrips as Trip[],
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined,
        },
      };
      mockCacheManager.get.mockResolvedValue(null);
      mockHttpService.get.mockReturnValue(of(axiosResponse));
      mockConfigService.get
        .mockReturnValueOnce('http://api-url')
        .mockReturnValueOnce('fake-api-key')
        .mockReturnValue(3600);

      const result = await service.findTrips(query);

      expect(httpService.get).toHaveBeenCalledWith('http://api-url', {
        params: { origin: query.origin, destination: query.destination },
        headers: { 'x-api-key': 'fake-api-key' },
      });
      expect(cacheManager.set).toHaveBeenCalledWith(cacheKey, mockTrips, {
        ttl: 3600,
      });
      expect(result).toEqual(mockTrips);
    });
  });
  it('should handle network errors gracefully', async () => {
    const query: FindTripsDto = {
      origin: 'NYC',
      destination: 'LAX',
      sort_by: SortOptions.cheapest,
    };
    mockCacheManager.get.mockResolvedValue(null);
    mockHttpService.get.mockReturnValueOnce(new HttpException('error', 500));
    mockConfigService.get.mockReturnValue('http://api-url');

    await expect(service.findTrips(query)).rejects.toThrow(
      'Failed to fetch trips: unknown source.subscribe is not a function',
    );
  });
});
