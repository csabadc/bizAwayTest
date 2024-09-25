import { validate } from 'class-validator';
import { SaveTripDto } from '../../dto/save-trip.dto';

describe('SaveTripDto', () => {
  let dto: SaveTripDto;

  beforeEach(() => {
    dto = new SaveTripDto();
    dto.origin = 'JFK';
    dto.destination = 'LAX';
    dto.cost = 300;
    dto.duration = 6;
    dto.type = 'car';
    dto.id = 'trip1';
    dto.display_name = 'NYC to LA';
  });

  it('should be valid with correct data', async () => {
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation if display_name is not a string', async () => {
    dto.display_name = 12345 as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isString).toBeDefined();
  });
});
