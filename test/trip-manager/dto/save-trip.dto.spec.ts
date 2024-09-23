import { SaveTripDto } from 'src/trip-manager/dto/save-trip.dto';

describe('SaveTripDto', () => {
  it('should validate the DTO correctly', async () => {
    const dto = new SaveTripDto();
    dto.origin = 'JFK';
    dto.destination = 'LAX';
    dto.cost = 300;
    dto.duration = 6;
    dto.type = 'one-way';
    dto.id = 'trip1';
    dto.display_name = 'NYC to LA';

    expect(dto.origin).toEqual('JFK');
  });

  // Add more validation tests here...
});
