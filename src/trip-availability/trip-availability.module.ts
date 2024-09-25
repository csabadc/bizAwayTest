import { Module } from '@nestjs/common';
import { TripAvailabilityService } from './trip-availability.service';
import { HttpModule } from '@nestjs/axios';
import { TripAvailabilityController } from './trip-availability.controller';
import { PlaceModule } from '../places/place.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, PlaceModule, CacheModule.register(), ConfigModule],
  providers: [TripAvailabilityService],
  controllers: [TripAvailabilityController],
  exports: [TripAvailabilityService],
})
export class TripAvailabilityModule {}
