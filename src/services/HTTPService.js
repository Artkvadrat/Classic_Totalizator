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
        ...(!!jwtToken && { Authorization: `Bearer ${jwtToken}` })
      },
      ...(body && { body: JSON.stringify(body) })
    };

    return fetch(url, options).then((res) => {
      if ([401, 403, 400].includes(res.status)) {
        throw new Error('Invalid data');
      }

      return res.json();
    });
  }
}

// import mockedEventsResponse from './mockedEventsResponse';

// export default class HTTPService {
//   static request({ path }) {
//     if (path === '/api/Events/feed') {
//       return new Promise((resolve) => {
//         setTimeout(() => resolve(mockedEventsResponse), 800);
//       });
//     }

//     if (path === '/api/Events/finishEvent') {
//       return new Promise((resolve) => {
//         setTimeout(() => resolve(true), 800);
//       });
//     }
//   }
// }
