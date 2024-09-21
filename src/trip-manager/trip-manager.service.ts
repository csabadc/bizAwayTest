import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SaveTripDto } from './dto/save-trip.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip } from 'src/common/model/trip.model';

@Injectable()
export class TripManagerService {
  constructor(@InjectModel('Trip') private readonly tripModel: Model<Trip>) {}

  async saveTripDto(saveTripDto: SaveTripDto, user: string): Promise<Trip> {
    const trip = new this.tripModel({
      ...saveTripDto,
      user,
    });
    try {
      return trip.save();
    } catch (error) {
      throw new InternalServerErrorException('Error in the trip saving');
    }
  }

  async deleteTrip(tripId: string, user: string): Promise<{ message: string }> {
    const result = await this.tripModel.findOneAndDelete({
      id: tripId,
      user: user,
    });
    if (!result) {
      throw new NotFoundException(`Trip with ID ${tripId} not found`);
    }
    return { message: 'Trip successfully deleted' };
  }

  async getSavedTrips(user: string): Promise<Trip[]> {
    const trips = await this.tripModel
      .find({ user }, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 })
      .exec();

    return trips;
  }
}
