import { fireEvent } from '@testing-library/dom';
import {
  createState,
  forecastData,
  mockStore,
  renderWithState,
} from '../../tests';
import { prevPage, nextPage } from '../../store/display';
import WeatherControl from './WeatherControl';

describe('Weather Control', () => {
  it('should not show arrows given no forecast data', () => {
    const { queryByLabelText } = renderWithState(<WeatherControl />, {
      initialState: createState(),
    });

    expect(queryByLabelText(/previous page/i)).toBeNull();
    expect(queryByLabelText(/next page/i)).toBeNull();
  });

  it('should not show prev arrow when page index is 0', () => {
    const { queryByLabelText } = renderWithState(<WeatherControl />, {
      initialState: createState({
        data: { loading: false, forecast: forecastData },
        display: { pageIndex: 0 },
      }),
    });

    expect(queryByLabelText(/previous page/i)).toBeNull();
    expect(queryByLabelText(/next page/i)).toBeVisible();
  });

  it('should not show next arrow when no item at page index + page size', () => {
    const { queryByLabelText } = renderWithState(<WeatherControl />, {
      initialState: createState({
        data: { loading: false, forecast: forecastData },
        display: { 
          pageSize: 3,
          pageIndex: forecastData.list.length - 3, 
        },
      }),
    });

    expect(queryByLabelText(/previous page/i)).toBeVisible();
    expect(queryByLabelText(/next page/i)).toBeNull();
  });

  it('should show both arrows when page index > 0 and < length - page size', () => {
    const { queryByLabelText } = renderWithState(<WeatherControl />, {
      initialState: createState({
        data: { loading: false, forecast: forecastData },
        display: { 
          pageSize: 3,
          pageIndex: 1,
          active: 1,
        },
      }),
    });

    expect(queryByLabelText(/previous page/i)).toBeVisible();
    expect(queryByLabelText(/next page/i)).toBeVisible();
  });

  it('should dispatch correct action on clicking prev arrow', () => {
    const { queryByLabelText, store } = renderWithState(<WeatherControl />, {
      store: mockStore(createState({
        data: { loading: false, forecast: forecastData },
        display: { 
          pageSize: 3,
          pageIndex: 1,
          active: 1,
        },
      })),
    });

    fireEvent.click(queryByLabelText(/previous page/i));

    expect(store.getActions()).toEqual([
      { 
        type: prevPage.type, 
        payload: { length: forecastData.list.length },
      },
    ]);
  });

  it('should dispatch correct action on clicking next arrow', () => {
    const { queryByLabelText, store } = renderWithState(<WeatherControl />, {
      store: mockStore(createState({
        data: { loading: false, forecast: forecastData },
        display: { 
          pageSize: 3,
          pageIndex: 1,
          active: 1,
        },
      })),
    });

    fireEvent.click(queryByLabelText(/next page/i));

    expect(store.getActions()).toEqual([
      { 
        type: nextPage.type, 
        payload: { length: forecastData.list.length },
      },
    ]);
  });
});
