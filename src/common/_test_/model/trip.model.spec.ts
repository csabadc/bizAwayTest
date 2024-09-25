import { Trip } from '../../model/trip.model';

describe('Trip Interface', () => {
  it('should match the Trip interface structure', () => {
    const mockTrip: Partial<Trip> = {
      origin: 'JFK',
      destination: 'LAX',
      cost: 300,
      duration: 6,
      type: 'one-way',
      id: 'trip1',
      display_name: 'NYC to LA',
    };

    expect(mockTrip).toEqual({
      origin: expect.any(String),
      destination: expect.any(String),
      cost: expect.any(Number),
      duration: expect.any(Number),
      type: expect.any(String),
      id: expect.any(String),
      display_name: expect.any(String),
    });
  });
});
