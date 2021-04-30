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
