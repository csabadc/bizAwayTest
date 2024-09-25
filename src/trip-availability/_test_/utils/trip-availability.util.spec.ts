import { sortTrips } from '../../utils/trip-availability.util';
import { Trip } from '../../../common/model/trip.model';
import { SortOptions } from '../../dto/query-trip.dto';

describe('sortTrips', () => {
  const trips: Partial<Trip>[] = [
    {
      origin: 'JFK',
      destination: 'LAX',
      cost: 300,
      duration: 25,
      type: 'car',
      id: 'trip1',
      display_name: 'NYC to LAX',
    },
    {
      origin: 'JFK',
      destination: 'LAX',
      cost: 50,
      duration: 5,
      type: 'car',
      id: 'trip2',
      display_name: 'NYC to LAX',
    },
  ];

  it('should sort trips by cost "cheapest"', () => {
    const sortedTrips = sortTrips(trips as Trip[], SortOptions.cheapest);

    expect(sortedTrips).toEqual([
      {
        origin: 'JFK',
        destination: 'LAX',
        cost: 50,
        duration: 5,
        type: 'car',
        id: 'trip2',
        display_name: 'NYC to LAX',
      },
      {
        origin: 'JFK',
        destination: 'LAX',
        cost: 300,
        duration: 25,
        type: 'car',
        id: 'trip1',
        display_name: 'NYC to LAX',
      },
    ]);
  });

  it('should sort trips by duration  "fastest"', () => {
    const sortedTrips = sortTrips(trips as Trip[], SortOptions.fastest);

    expect(sortedTrips).toEqual([
      {
        origin: 'JFK',
        destination: 'LAX',
        cost: 50,
        duration: 5,
        type: 'car',
        id: 'trip2',
        display_name: 'NYC to LAX',
      },
      {
        origin: 'JFK',
        destination: 'LAX',
        cost: 300,
        duration: 25,
        type: 'car',
        id: 'trip1',
        display_name: 'NYC to LAX',
      },
    ]);
  });
  it('should return the original array when sort option is not recognized', () => {
    const sortedTrips = sortTrips(trips as Trip[], undefined);

    expect(sortedTrips).toEqual(trips);
  });
});
