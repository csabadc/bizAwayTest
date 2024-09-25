import { validate } from 'class-validator';

import { FindTripsDto, SortOptions } from '../../dto/query-trip.dto';

describe('FindTripsDto', () => {
  let dto: FindTripsDto;

  beforeEach(() => {
    dto = new FindTripsDto();
    dto.origin = 'LHR';
    dto.destination = 'ZGZ';
    dto.sort_by = SortOptions.cheapest;
  });

  it('should be valid with correct data', async () => {
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation if sort_by is not valid', async () => {
    dto.sort_by = 12345 as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isString).toBeDefined();
  });
});
