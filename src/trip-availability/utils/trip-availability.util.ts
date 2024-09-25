import { Trip } from 'src/common/model/trip.model';
import { SortOptions } from '../dto/query-trip.dto';

export const sortTrips = (trips: Trip[], sortOption: SortOptions): Trip[] => {
  switch (sortOption) {
    case SortOptions.cheapest:
      return trips.sort((tripA, tripB) => tripA.cost - tripB.cost);
    case SortOptions.fastest:
      return trips.sort((tripA, tripB) => tripA.duration - tripB.duration);
    default:
      return trips;
  }
};
