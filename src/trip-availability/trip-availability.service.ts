import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FindTripsDto, SortOptions } from './dto/query-trip.dto';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Trip } from 'src/common/model/trip.model';

@Injectable()
export class TripAvailabilityService {
  private readonly apiKey = 'fgy6fd9I316DSDD090Shj4eG1DUxuxpI8sZlAOg1';
  private readonly apiUrl =
    'https://z0qw1e7jpd.execute-api.eu-west-1.amazonaws.com/default/trips';

  constructor(private readonly httpService: HttpService) {}

  async findTrips(query: FindTripsDto): Promise<Trip[]> {
    const { origin, destination, sort_by } = query;

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
      return this.sortTrips(trips, sort_by);
    } catch (error) {
      console.error('Error fetching trips:', error.message);
      throw new HttpException(
        `Failed to fetch trips: ${error.response?.status || 'unknown'} ${error.message}`,
        error.response?.status || 500,
      );
    }
  }

  private sortTrips(trips: Trip[], sortOption: SortOptions): Trip[] {
    switch (sortOption) {
      case SortOptions.cheapest:
        return trips.sort((tripA, tripB) => tripA.cost - tripB.cost);
      case SortOptions.fastest:
        return trips.sort((tripA, tripB) => tripA.duration - tripB.duration);
      default:
        return trips;
    }
  }
}
