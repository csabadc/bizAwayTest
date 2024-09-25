import { Module } from '@nestjs/common';
import { TripManagerController } from './trip-manager.controller';
import { TripManagerService } from './trip-manager.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TripSchema } from './schemas/trip.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Trip', schema: TripSchema }])],
  providers: [TripManagerService],
  controllers: [TripManagerController],
  exports: [TripManagerService],
})
export class TripManagerModule {}
