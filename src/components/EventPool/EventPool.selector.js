import { createStructuredSelector } from 'reselect';
import parseDate from '../../services/dateParse/dateParse';

// Right now I use createStructuredSelector only for get needed structured data from response
// Need to create normal memoized selector when refactor the app. And when we will agree all contracts with backend

const isLoadingSelector = (state) => state.events.isLoading;
const eventsDataSelector = (state) =>
  state.events.eventsData
    .sort((a, b) => Date.parse(a.startTime) - Date.parse(b.startTime))
    .map(
      ({
        id,
        startTime,
        participant1,
        participant2,
        sportName,
        margin,
        possibleResults,
        isEnded
      }) => ({
        key: id,
        date: parseDate(startTime),
        player1: participant1.name,
        player2: participant2.name,
        sport: sportName,
        margin: `${margin}%`,
        possibleResults,
        isEnded
      })
    );

const eventPoolSelector = createStructuredSelector({
  isLoading: isLoadingSelector,
  eventsData: eventsDataSelector
});

export default eventPoolSelector;
