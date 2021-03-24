const parseDate = (dateString) => {
  const dateObj = new Date(dateString);
  const addLeadingZeros = (number) => number.toString().padStart(2, '0');

  let month = dateObj.getMonth() + 1;
  let date = dateObj.getDate();
  let hh = dateObj.getHours();
  let mm = dateObj.getMinutes();
  const year = dateObj.getFullYear();

  [month, date, hh, mm] = [month, date, hh, mm].map((el) =>
    addLeadingZeros(el)
  );

  return `${hh}:${mm} ${date}.${month}.${year}`;
};

export default parseDate;
