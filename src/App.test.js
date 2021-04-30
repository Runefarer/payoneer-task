import { createState, forecastData, renderWithState } from './tests';
import { kelvinToFarenheit } from './shared/temperature';
import App from './App';

describe('App', () => {
  it('should render Loading... initially', () => {
    const { getByText, queryByText } = renderWithState(<App />, {
      initialState: createState(),
    });
  
    expect(getByText('Loading...')).toBeVisible();

    expect(getByText('Farenheit')).not.toBeVisible();
    expect(getByText('Celsius')).not.toBeVisible();
    expect(queryByText('Temp')).toBeNull();
    expect(queryByText('Date')).toBeNull();
    expect(
      queryByText('Unable to get forecast. Please refresh and try again.')
    ).toBeNull();
  });

  it('should render Weather when loading done', () => {
    const { getByText, queryByText, queryAllByText } = renderWithState(<App />, {
      initialState: createState({
        data: { loading: false, forecast: forecastData },
      }),
    });
  
    expect(getByText('Loading...')).not.toBeVisible();
    expect(
      queryByText('Unable to get forecast. Please refresh and try again.')
    ).toBeNull();

    expect(getByText('Farenheit')).toBeVisible();
    expect(getByText('Celsius')).toBeVisible();

    queryAllByText('Temp').forEach((temp) => expect(temp).toBeVisible());
    queryAllByText('Date').forEach((date) => expect(date).toBeVisible());

    expect(getByText(forecastData.list[0].day)).toBeVisible();

    const avgTemp = forecastData.list[0].data.reduce(
      (acc, val) => acc + val.main.temp, 0
    ) / forecastData.list[0].data.length;
    expect(getByText(`${kelvinToFarenheit(avgTemp)}F`)).toBeVisible();
  });

  it('should show Error when there is an error', () => {
    const { queryByText } = renderWithState(<App />, {
      initialState: createState({
        data: {
          error: {
            message: 'Unable to get forecast. Please refresh and try again.',
          },
        },
      }),
    });
  
    expect(
      queryByText('Unable to get forecast. Please refresh and try again.')
    ).toBeVisible();
  });
});
