import { createStructuredSelector } from 'reselect';

// Right now I use createStructuredSelector only for get needed structured data from response
// Need to create normal memoized selector when refactor the app. And when we will agree all contracts with backend

const getHumanDateFormat = (dateString) => {
  const dateObj = new Date(dateString);
  const addLeadingZeros = (number) => number.toString().padStart(2, '0');

  let month = dateObj.getMonth() + 1;
  let date = dateObj.getDate();
  let hh = dateObj.getHours();
  let mm = dateObj.getMinutes();

  [month, date, hh, mm] = [month, date, hh, mm].map((el) =>
    addLeadingZeros(el)
  );

  return `${hh}:${mm} ${date}.${month}`;
};

const isLoadingSelector = (state) => state.events.isLoading;
const eventsDataSelector = (state) =>
  state.events.eventsData.map(
    ({
      id,
      participant1,
      participant2,
      startTime,
      sport,
      margin,
      possibleResults,
      eventResult,
      isEnded
    }) => ({
      key: id,
      date: getHumanDateFormat(startTime),
      player1: participant1.name,
      player2: participant2.name,
      sport: sport.name,
      margin: `${margin}%`,
      possibleResults,
      eventResult,
      isEnded
    })
  );

const eventPoolSelector = createStructuredSelector({
  isLoading: isLoadingSelector,
  eventsData: eventsDataSelector
});

export default eventPoolSelector;
