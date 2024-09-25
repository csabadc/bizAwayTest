import { model } from 'mongoose';
import { TripSchema } from '../../schemas/trip.schema';

describe('TripSchema', () => {
  const Trip = model('Trip', TripSchema);

  it('should validate a valid trip schema', async () => {
    const validTrip = new Trip({
      origin: 'JFK',
      destination: 'LAX',
      cost: 300,
      duration: 6,
      type: 'flight',
      id: 'trip1',
      display_name: 'JFK to LAX',
      user: 'user1',
    });
    expect(validTrip.origin).toEqual('JFK');
    expect(validTrip.destination).toEqual('LAX');
  });
});
