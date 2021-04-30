import { fireEvent } from '@testing-library/dom';
import {
  createState,
  forecastData,
  mockStore,
  renderWithState,
} from '../../tests';
import { activate } from '../../store/display';
import { kelvinToFarenheit } from '../../shared/temperature';
import WeatherInfo from './WeatherInfo';

describe('Weather Info', () => {
  it('should display all weather cards given forecast', () => {
    const { queryByText, queryAllByText } = renderWithState(<WeatherInfo />, {
      initialState: createState({
        data: { loading: false, forecast: forecastData },
      }),
    });
  
    const tempTexts = queryAllByText('Temp');
    const dateTexts = queryAllByText('Date');

    expect(tempTexts.length).toBe(forecastData.list.length);
    tempTexts.forEach((tempText) => expect(tempText).toBeVisible());

    expect(dateTexts.length).toBe(forecastData.list.length);
    dateTexts.forEach((dateText) => expect(dateText).toBeVisible());

    forecastData.list.forEach((card) => {
      expect(queryByText(card.day)).toBeVisible();

      const avgTemp = card.data.reduce(
        (acc, val) => acc + val.main.temp, 0
      ) / card.data.length;
      expect(queryByText(`${kelvinToFarenheit(avgTemp)}F`)).toBeVisible();
    });
  });

  it('should dispatch activate on clicking a card', () => {
    const { queryAllByTestId, store } = renderWithState(<WeatherInfo />, {
      store: mockStore(createState({
        data: { loading: false, forecast: forecastData },
      })),
    });
  
    const cards = queryAllByTestId('card');
    fireEvent.click(cards[2]);

    expect(store.getActions().pop()).toEqual({ 
      type: activate.type, 
      payload: 2,
    });
  });
});
