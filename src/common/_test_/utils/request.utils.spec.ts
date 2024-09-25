import { Request } from 'express';
import { extractTokenFromHeader } from '../../utils/request.utils';

describe('extractTokenFromHeader', () => {
  let mockRequest: Partial<Request>;

  beforeEach(() => {
    mockRequest = {
      headers: {
        authorization: undefined,
      },
    };
  });

  it('should return undefined if authorization header is missing', () => {
    expect(extractTokenFromHeader(mockRequest as Request)).toBeUndefined();
  });

  it('should return undefined if authorization header is not a Bearer token', () => {
    mockRequest.headers.authorization = 'Basic some-token';
    expect(extractTokenFromHeader(mockRequest as Request)).toBeUndefined();
  });

  it('should return the token if authorization header is a Bearer token', () => {
    mockRequest.headers.authorization = 'Bearer token';
    expect(extractTokenFromHeader(mockRequest as Request)).toEqual('token');
  });
});
