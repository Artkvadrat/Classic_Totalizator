// const END_POINT = '';

const END_POINT = 'https://classic-totalizator-ajg2w.ondigitalocean.app';

export default class HTTPService {
  static async request({ method = 'GET', path, body }) {
    const url = `${END_POINT}${path}`;

    const jwtToken = window.localStorage.getItem('jwtToken');

    const options = {
      method,
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json',
        ...(!!jwtToken && { Authorization: jwtToken })
      },
      ...(body && { body: JSON.stringify(body) })
    };

    return fetch(url, options).then((res) => res.json());
  }
}
