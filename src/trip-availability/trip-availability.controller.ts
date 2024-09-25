import { AuthGuard } from '../auth/auth.guard';
import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FindTripsDto } from './dto/query-trip.dto';
import { TripAvailabilityService } from './trip-availability.service';
import { Trip } from '../common/model/trip.model';

import { PlaceService } from '../places/place.service';

@Controller('trip-availability')
export class TripAvailabilityController {
  constructor(
    private TripAvailabilityService: TripAvailabilityService,
    private PlaceService: PlaceService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async findTrips(@Query() queryTrips: FindTripsDto): Promise<Trip[]> {
    const iatas = await this.PlaceService.findPlacesByIATA([
      queryTrips.destination,
      queryTrips.origin,
    ]);
    if (iatas.length === 2) {
      return await this.TripAvailabilityService.findTrips(queryTrips);
    } else {
      throw new BadRequestException(
        'Iatas requested are not allowed on the system',
      );
    }
  }
}
