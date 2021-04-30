import { createState, forecastData, renderWithState } from '../../tests';
import WeatherChart from './WeatherChart';

describe('Weather Chart', () => {
  it('should not be displayed given no forecast data', () => {
    const { queryByTestId } = renderWithState(
      <WeatherChart />,
      {
        initialState: createState(),
      },
    );

    expect(queryByTestId('canvas')).toBeNull();
  });

  it('should be displayed given forecast data', () => {
    const { queryByTestId } = renderWithState(
      <WeatherChart />,
      {
        initialState: createState({
          data: { loading: false, forecast: forecastData },
          display: { unit: 'F', pageIndex: 0, active: 0 },
        }),
      },
    );

    expect(queryByTestId('canvas')).toBeVisible();
  });
});
