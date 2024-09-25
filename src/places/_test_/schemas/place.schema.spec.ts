import { model } from 'mongoose';
import { PlaceSchema } from '../../schemas/place.schema';

describe('PlaceSchema', () => {
  const Place = model('Place', PlaceSchema);

  it('should validate a Place schema', async () => {
    const place = new Place({
      IATA: 'JFK',
    });
    expect(place.IATA).toEqual('JFK');
  });
});
