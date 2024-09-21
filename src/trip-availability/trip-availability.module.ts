import { Module } from '@nestjs/common';
import { TripAvailabilityService } from './trip-availability.service';
import { HttpModule } from '@nestjs/axios';
import { TripAvailabilityController } from './trip-availability.controller';

@Module({
  imports: [HttpModule],
  providers: [TripAvailabilityService],
  controllers: [TripAvailabilityController],
  exports: [TripAvailabilityService],
})
export class TripAvailabilityModule {}
