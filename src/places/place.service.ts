import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Place } from './model/place.model';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel('Place') private readonly placeModel: Model<Place>,
  ) {}

  async findPlacesByIATA(iataCodes: string[]): Promise<Place[]> {
    return this.placeModel.find({ IATA: { $in: iataCodes } }).exec();
  }
}
