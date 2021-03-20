import mockedEventsResponse from './mockedEventsResponse';

export default class HTTPService {
  static request() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockedEventsResponse), 800);
    });
  }
}
