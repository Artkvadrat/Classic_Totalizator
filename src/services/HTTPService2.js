const mockedEventsResponse = {
  events: [
    {
      id: '593aa557-5af8-472d-ac3d-fe674ce7da67',
      participant1: {
        id: 'd2428b78-1da6-49bc-aa4d-e559013079a6',
        name: 'Hammes - Bode',
        players: [],
        photoLink: 'http://placeimg.com/640/480/people',
        parameters: []
      },
      participant2: {
        id: '838450ed-01aa-46b5-9b95-3f335d6edc9e',
        name: 'Gwen Greenholt',
        players: [],
        photoLink: 'http://placeimg.com/640/480/people',
        parameters: []
      },
      startTime: '2021-03-22T18:13:00+00:00',
      sportName: 'Joany_Green',
      margin: 2,
      possibleResults: ['W1', 'X', 'W2'],
      isEnded: true,
      amountW1: 0,
      amountW2: 0,
      amountX: 0
    },
    {
      id: '40dca2cb-af06-4711-b03b-830387a7a6e9',
      participant1: {
        id: '2055a9c9-2860-444f-be65-452fc8f74697',
        name: 'Beier Group',
        players: [],
        photoLink: 'http://placeimg.com/640/480/people',
        parameters: []
      },
      participant2: {
        id: 'd0d27025-cbd8-46ac-9aba-737e115364f9',
        name: 'Klocko - Champlin',
        players: [],
        photoLink: 'http://placeimg.com/640/480/people',
        parameters: []
      },
      startTime: '2021-03-23T10:36:10.271+00:00',
      sportName: 'UFC',
      margin: 5.1,
      possibleResults: ['W1', 'W2'],
      isEnded: true,
      amountW1: 0,
      amountW2: 0,
      amountX: 0
    },
    {
      id: 'ce1c4820-f3f5-4332-87e0-58cc6a757972',
      participant1: {
        id: 'e1a64db3-b9c1-43bd-9291-135afd199990',
        name: 'string',
        players: [],
        photoLink: 'string',
        parameters: []
      },
      participant2: {
        id: '821642ad-95df-4dea-bc38-9d62f8e08007',
        name: 'Kulas Inc',
        players: [],
        photoLink: 'http://placeimg.com/640/480/people',
        parameters: []
      },
      startTime: '2021-03-25T11:21:31.317+00:00',
      sportName: 'football',
      margin: 1.5,
      possibleResults: ['W1', 'X', 'W2'],
      isEnded: false,
      amountW1: 0,
      amountW2: 0,
      amountX: 0
    },
    {
      id: '34973bdc-15cc-48f0-83cb-6d51e9266b22',
      participant1: {
        id: '1822795b-d313-41f3-a105-e4e40b7d6e77',
        name: 'Kathryn Effertz',
        players: [],
        photoLink: 'http://placeimg.com/640/480/people',
        parameters: []
      },
      participant2: {
        id: 'd2428b78-1da6-49bc-aa4d-e559013079a6',
        name: 'Hammes - Bode',
        players: [],
        photoLink: 'http://placeimg.com/640/480/people',
        parameters: []
      },
      startTime: '2021-03-26T10:55:00+00:00',
      sportName: 'UFC',
      margin: 3,
      possibleResults: ['W1', 'X', 'W2'],
      isEnded: false,
      amountW1: 1012,
      amountW2: 4000,
      amountX: 200
    },
    {
      id: '665e67e2-8f13-407a-8372-451946e30c78',
      participant1: {
        id: '7d60813c-884a-48bd-b805-54ab831c63a0',
        name: 'Turcotte LLC',
        players: [],
        photoLink: 'http://placeimg.com/640/480/people',
        parameters: []
      },
      participant2: {
        id: '10525a9a-29e1-4d21-8ddb-d94491b16c10',
        name: 'Parker LLC',
        players: [],
        photoLink: 'http://placeimg.com/640/480/people',
        parameters: []
      },
      startTime: '2021-03-26T23:26:00+00:00',
      sportName: 'Joany_Green',
      margin: 3,
      possibleResults: ['W1', 'X', 'W2'],
      isEnded: true,
      amountW1: 1000,
      amountW2: 999,
      amountX: 0
    }
  ]
};

export default class HTTPService {
  static request({ path }) {
    if (path === '/api/Events/getAllEvents') {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockedEventsResponse), 100);
      });
    }

    if (path === '/api/Events/finishEvent') {
      return new Promise((resolve) => {
        setTimeout(() => resolve(true), 800);
      });
    }
  }
}
