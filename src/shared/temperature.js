export const ABSOLUTE_ZERO  = -273.15;

export const kelvinToCelsius = (kelvin) => {
  const celsius = Math.round(kelvin + ABSOLUTE_ZERO);
  return celsius === -0 ? 0 : celsius;
};

export const kelvinToFarenheit = (kelvin) => {
  const farenheit = Math.round(((kelvin + ABSOLUTE_ZERO) * 9 / 5) + 32);
  return farenheit === -0 ? 0 : farenheit;
};
