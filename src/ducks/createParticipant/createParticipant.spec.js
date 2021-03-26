import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  SENT_PARTICIPANT,
  CLEAN_ERROR,
  UNSENT_PARTICIPANT,
  sendParticipant,
  resetError
} from './createParticipant';

jest.mock('../../services/HTTPService/HTTPService', () => ({
  request: () =>
    new Promise((resolve) => {
      resolve(true);
    })
}));

const HTTPService = require('../../services/HTTPService/HTTPService');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('createParticipant reducer', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual({
        isSent: false,
        error: false
      });
    });

    it('should handle SENT_PARTICIPANT', () => {
      expect(
        reducer({ isSent: false, error: false }, { type: SENT_PARTICIPANT })
      ).toEqual({ isSent: true, error: false });
    });

    it('should handle UNSENT_PARTICIPANT', () => {
      expect(
        reducer({ isSent: false, error: false }, { type: UNSENT_PARTICIPANT })
      ).toEqual({ isSent: false, error: true });
    });

    it('should handle CLEAN_ERROR', () => {
      expect(
        reducer({ isSent: false, error: true }, { type: CLEAN_ERROR })
      ).toEqual({ isSent: false, error: false });
    });
  });

  describe('action with calling HTTPService', () => {
    it('should dispatch SENT_PARTICIPANT', () => {
      const expectedActions = [{ type: SENT_PARTICIPANT }];

      const store = mockStore({ isSent: false, error: false });

      return store
        .dispatch(sendParticipant({ name: 'test', photoLink: 'link' }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should dispatch UNSENT_PARTICIPANT', () => {
      HTTPService.request = jest.fn().mockImplementationOnce(() =>
        Promise.reject(new Error('Bad data')).then(() => ({
          status: 403
        }))
      );

      const expectedActions = [{ type: UNSENT_PARTICIPANT }];

      const store = mockStore({ isSent: false, error: false });

      return store
        .dispatch(sendParticipant({ name: 'test', photoLink: 'link' }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('cleaning up store', () => {
    it('should clean up store', () => {
      const expectedActions = [{ type: CLEAN_ERROR }];

      const store = mockStore({ isSent: false, error: false });

      store.dispatch(resetError());

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
