const getCurrentDate = () => {
  const d = new Date();
  let hours = d.getHours(),
    minutes = d.getMinutes(),
    seconds = d.getSeconds(),
    day = d.getDate(),
    month = d.getMonth(),
    year = d.getFullYear();

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  day = day < 10 ? `0${day}` : day;
  month = month < 10 ? `0${month}` : month;

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

module.exports = getCurrentDate;
