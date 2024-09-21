import { Schema } from 'mongoose';

export const PlaceSchema = new Schema({
  IATA: {
    type: String,
    required: true,
    unique: true,
  },
});
