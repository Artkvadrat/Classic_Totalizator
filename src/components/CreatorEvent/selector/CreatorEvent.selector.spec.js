import { createSelector, createStructuredSelector } from 'reselect';

jest.mock('reselect', () => ({
  createSelector: jest.fn(),
  createStructuredSelector: jest.fn()
}));

it('should dispatch  action on mount', () => {});
