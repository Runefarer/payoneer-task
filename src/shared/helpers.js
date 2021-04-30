export const clampIndex = (index, start, end) => {
  if (index >= end) {
    return end - 1;
  }
  
  if (index < start) {
    return start;
  }

  return index;
};

export const sortByCountDesc = (a, b) => b.count - a.count;

export const iconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;
