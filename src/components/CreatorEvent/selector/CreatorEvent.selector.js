import { createSelector, createStructuredSelector } from 'reselect';

const dataSelector = (state) => state.creatorEvent;

const participantsSelector = createSelector(
  dataSelector,
  ({ participants }) => participants
);
const sportsSelector = createSelector(dataSelector, ({ sports }) => sports);
const eventSelector = createSelector(dataSelector, ({ addEvent }) => addEvent);
const loadingSelector = createSelector(
  dataSelector,
  ({ isLoading }) => isLoading
);

const valuesSelector = createStructuredSelector({
  participants: participantsSelector,
  sports: sportsSelector,
  addEvent: eventSelector,
  isLoading: loadingSelector
});

export default valuesSelector;
