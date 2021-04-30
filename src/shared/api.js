const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const APP_ID = '75f972b80e26f14fe6c920aa6a85ad57';

const buildQuery = (params = {}) => {
  const query = [];

  for (const name in params) {
    query.push(`${name}=${encodeURIComponent(params[name])}`);
  }
  query.push(`appid=${encodeURIComponent(APP_ID)}`);

  return query.join('&');
};

export const getForecast = async (location = 'Delhi,in') => {
  const query = buildQuery({
    q: location,
    cnt: 40,
  });

  const response = await fetch(`${BASE_URL}/forecast?${query}`);
  if (!response.ok) {
    throw new Error('Unable to fetch forecast');
  }

  return response.json();
};
