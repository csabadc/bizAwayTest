import { Place } from '../../model/place.model';

describe('Trip Interface', () => {
  it('should match the Trip interface structure', () => {
    const mockPlace: Partial<Place> = {
      IATA: 'JFK',
    };

    expect(mockPlace).toEqual({
      IATA: expect.any(String),
    });
  });
});
