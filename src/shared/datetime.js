const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const toInt = (value) => parseInt(value);

// date and time is always based on API date text, which is in UTC
// this will ensure same date and time regardless of local time of client
export const getDay = (dateText) => {
  const dayText = dateText.split(' ')[0];
  const [year, month, dayOfMonth] = dayText.split('-').map(toInt);

  return `${dayOfMonth} ${MONTHS[month - 1]} ${`${year}`.slice(-2)}`;
};

export const getTime = (dateText) => {
  const timeText = dateText.split(' ')[1];
  const [hour, minute] = timeText.split(':').map(toInt);

  if (hour >= 12) {
    return `${hour > 12 ? hour - 12 : hour}:${`${minute}`.padStart(2, '0')} PM`;
  } else {
    return `${(hour === 0 ? `00` : hour)}:${`${minute}`.padStart(2, '0')} AM`;
  }
};
