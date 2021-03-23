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
        date: getHumanDateFormat(startTime),
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
