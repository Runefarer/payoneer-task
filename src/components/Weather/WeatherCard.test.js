import { fireEvent, waitFor } from '@testing-library/dom';
import { ThemeProvider } from '@material-ui/core';
import { createState, forecastData, renderWithState } from '../../tests';
import { kelvinToFarenheit, kelvinToCelsius } from '../../shared/temperature';
import { sortByCountDesc } from '../../shared/helpers';
import { switchUnit } from '../../store/display';
import theme from '../../themes/theme';
import WeatherCard from './WeatherCard';

describe('Weather Card', () => {
  let day;
  let data;
  let avgTemp;
  let weatherDescs;

  beforeEach(() => {
    day = forecastData.list[0].day;
    data = forecastData.list[0].data;
    avgTemp = data.reduce((acc, val) => acc + val.main.temp, 0) / data.length;

    const weathers = {};
    weatherDescs = {};

    data.forEach((slice) => {
      const weather = slice.weather[0];

      weathers[weather.main] = weathers[weather.main] || { count: 0, types: {} };
      weathers[weather.main].count++;
      
      if (!weathers[weather.main].types[weather.icon]) {
        weathers[weather.main].types[weather.icon] = { count: 0, weather };
      }
      weathers[weather.main].types[weather.icon].count++;

      weatherDescs[weather.description] = weatherDescs[weather.description] || { count: 0 };
      weatherDescs[weather.description].count++;
    });

    const sortedByMain = Object.values(weathers).sort(sortByCountDesc);
    const sortedByIcon = Object.values(sortedByMain[0].types).sort(sortByCountDesc);

    weatherDescs[sortedByIcon[0].weather.description].count++;
  });

  it('should be displayed correctly', () => {
    const { queryByText, queryAllByAltText, queryByTestId } = renderWithState(
      <ThemeProvider theme={theme}>
        <WeatherCard day={day} data={data} />
      </ThemeProvider>,
      {
        initialState: createState({
          data: { loading: false, forecast: forecastData },
          display: { unit: 'F', pageIndex: 0, active: 1 },
        }),
      },
    );

    expect(queryByText('Temp')).toBeVisible();
    expect(queryByText(`${kelvinToFarenheit(avgTemp)}F`)).toBeVisible();

    expect(queryByText('Date')).toBeVisible();
    expect(queryByText(day)).toBeVisible();

    for (const desc in weatherDescs) {
      expect(queryAllByAltText(desc)?.length).toBe(weatherDescs[desc].count);
    }

    const card = queryByTestId('card');
    expect(card).toBeVisible();
    expect(card).not.toHaveStyle(`
      border-color: ${theme.palette.primary.main};
      border-width: 3px;
      border-style: solid;
    `);
  });

  it('should change temperature on unit change', async () => {
    const { queryByText, store } = renderWithState(
      <WeatherCard day={day} data={data} />,
      {
        initialState: createState({
          data: { loading: false, forecast: forecastData },
          display: { unit: 'F', pageIndex: 0, active: 1 },
        }),
      },
    );

    const farenheit = `${kelvinToFarenheit(avgTemp)}F`;
    const celsius = `${kelvinToCelsius(avgTemp)}C`;

    expect(queryByText(farenheit)).toBeVisible();
    expect(queryByText(celsius)).toBeNull();

    store.dispatch(switchUnit('C'));
    await waitFor(() => {
      expect(queryByText(farenheit)).toBeNull();
      expect(queryByText(celsius)).toBeVisible();
    });

    store.dispatch(switchUnit('F'));
    await waitFor(() => {
      expect(queryByText(farenheit)).toBeVisible();
      expect(queryByText(celsius)).toBeNull();
    });
  });

  it('should visually indicate when card is active', () => {
    const { queryByTestId } = renderWithState(
      <ThemeProvider theme={theme}>
        <WeatherCard day={day} data={data} active={true} />
      </ThemeProvider>,
      {
        initialState: createState({
          data: { loading: false, forecast: forecastData },
          display: { unit: 'F', pageIndex: 0, active: 0 },
        }),
      },
    );

    const card = queryByTestId('card');
    expect(card).toBeVisible();
    expect(card).toHaveStyle(`
      border-color: ${theme.palette.primary.main};
      border-width: 3px;
      border-style: solid;
    `);
  });

  it('should trigger onActivate when clicked', () => {
    const onActivate = jest.fn();

    const { queryByTestId } = renderWithState(
      <WeatherCard day={day} data={data} onActivate={onActivate} />,
      {
        initialState: createState({
          data: { loading: false, forecast: forecastData },
          display: { unit: 'F', pageIndex: 0, active: 1 },
        }),
      },
    );

    fireEvent.click(queryByTestId('card'));

    expect(onActivate).toHaveBeenCalledTimes(1);
  });
});
