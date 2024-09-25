import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaceSchema } from './schemas/place.schema';
import { PlaceService } from './place.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Place', schema: PlaceSchema }]),
  ],
  providers: [PlaceService],
  exports: [PlaceService],
})
export class PlaceModule {}
