import { AuthGuard } from 'src/auth/auth.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FindTripsDto } from './dto/query-trip.dto';
import { TripAvailabilityService } from './trip-availability.service';
import { Trip } from 'src/common/model/trip.model';

@Controller('trip-availability')
export class TripAvailabilityController {
  constructor(private TripAvailabilityService: TripAvailabilityService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findTrips(@Query() queryTrips: FindTripsDto): Promise<Trip[]> {
    return await this.TripAvailabilityService.findTrips(queryTrips);
  }
}
