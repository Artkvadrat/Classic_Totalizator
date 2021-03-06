const END_POINT = 'https://classic-totalizator-pdett.ondigitalocean.app';

export default class HTTPService {
  static async request({ method = 'GET', path, body }) {
    const url = `${END_POINT}${path}`;

    const jwtToken = window.localStorage.getItem('jwtToken');

    const options = {
      method,
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json',
        ...(!!jwtToken && { Authorization: `Bearer ${jwtToken}` })
      },
      ...(body && { body: JSON.stringify(body) })
    };

    return fetch(url, options).then((res) => {
      if ([401, 403, 400, 404].includes(res.status)) {
        throw new Error('Invalid data');
      }

      return res.json();
    });
  }
}
