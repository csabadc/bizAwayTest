import { Injectable, HttpException, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FindTripsDto } from './dto/query-trip.dto';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Trip } from 'src/common/model/trip.model';
import { sortTrips } from './utils/trip-availability.util';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TripAvailabilityService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
    private configService: ConfigService,
  ) {}

  async findTrips(query: FindTripsDto): Promise<Trip[]> {
    const { origin, destination, sort_by } = query;
    const cacheKey = `trips:${origin}:${destination}:${sort_by}`;
    const cachedTrips = await this.cacheManager.get<Trip[]>(cacheKey);
    if (cachedTrips) {
      return cachedTrips;
    }
    try {
      const response: AxiosResponse<Trip[]> = await firstValueFrom(
        this.httpService.get<Trip[]>(
          this.configService.get<string>('TRIP_APIURL'),
          {
            params: {
              origin: origin,
              destination: destination,
            },
            headers: {
              'x-api-key': this.configService.get<string>('TRIP_APIKEY'),
            },
          },
        ),
      );
      const trips: Trip[] = response.data || [];
      const sortedTrips = sortTrips(trips, sort_by);
      await this.cacheManager.set(cacheKey, sortedTrips, {
        ttl: this.configService.get<number>('CACHE_LIVE'),
      });
      return sortedTrips;
    } catch (error) {
      console.error('Error fetching trips:', error.message);
      throw new HttpException(
        `Failed to fetch trips: ${error.response?.status || 'unknown'} ${error.message}`,
        error.response?.status || 500,
      );
    }
  }
}
