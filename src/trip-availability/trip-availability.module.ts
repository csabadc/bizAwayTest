import { Module } from '@nestjs/common';
import { TripAvailabilityService } from './trip-availability.service';
import { HttpModule } from '@nestjs/axios';
import { TripAvailabilityController } from './trip-availability.controller';
import { PlaceModule } from 'src/places/place.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [HttpModule, PlaceModule, CacheModule.register()],
  providers: [TripAvailabilityService],
  controllers: [TripAvailabilityController],
  exports: [TripAvailabilityService],
})
export class TripAvailabilityModule {}
