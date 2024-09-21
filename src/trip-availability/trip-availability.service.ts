import { Injectable, HttpException, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FindTripsDto } from './dto/query-trip.dto';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Trip } from 'src/common/model/trip.model';
import { sortTrips } from './utils/trip-availability.utis';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class TripAvailabilityService {
  private readonly apiKey = 'fgy6fd9I316DSDD090Shj4eG1DUxuxpI8sZlAOg1';
  private readonly apiUrl =
    'https://z0qw1e7jpd.execute-api.eu-west-1.amazonaws.com/default/trips';

  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
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
        this.httpService.get<Trip[]>(this.apiUrl, {
          params: {
            origin: origin,
            destination: destination,
          },
          headers: {
            'x-api-key': this.apiKey,
          },
        }),
      );
      const trips: Trip[] = response.data || [];
      const sortedTrips = sortTrips(trips, sort_by);
      await this.cacheManager.set(cacheKey, sortedTrips, { ttl: 3600 });
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
