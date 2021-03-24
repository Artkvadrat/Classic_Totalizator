import '@babel/polyfill';
import fetchMock from 'fetch-mock';
import HTTPService from './HTTPService';

describe('HTTPService fetch', () => {
  afterAll(() => {
    fetchMock.reset();
  });
  it('should send request with given path and body and receive data', () => {
    fetchMock.once(
      'path:/api/Auth/login',
      {
        status: 200,
        body: {
          jwtString: 'testJwtToken'
        }
      },
      {
        method: 'POST',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'application/json'
        },
        body: {
          login: 'Daniel@test.com',
          password: 'admin2'
        }
      }
    );

    HTTPService.request({
      method: 'POST',
      path: '/api/Auth/login',
      body: {
        login: 'Daniel@test.com',
        password: 'admin2'
      }
    }).then((data) => {
      expect(data).toBeDefined();
      expect(data).toEqual({ jwtString: 'testJwtToken' });
    });
  });

  it("shouldn't get jwtToken and dispatch DENIED_JWT_TOKEN because of incorrect data", () => {
    fetchMock.once('path:/api/Auth/login', 403, {
      method: 'POST',
      overwriteRoutes: false,
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json'
      },
      body: {
        login: 'Daniel@test.com',
        password: 'admin123'
      }
    });

    HTTPService.request({
      method: 'POST',
      path: '/api/Auth/login',
      body: {
        login: 'Daniel@test.com',
        password: 'admin123'
      }
    }).catch((err) => {
      expect(err).toBeDefined();
      expect(err.message).toBe('Invalid data');
    });
  });
});
