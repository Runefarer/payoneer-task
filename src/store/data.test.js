import fetchMock from 'fetch-mock-jest';
import dataReducer, { fetchForecast } from './data';

describe('data reducer', () => {
  it('should handle initial state', () => {
    expect(dataReducer(undefined, { type: 'unknown' })).toEqual({
      loading: true,
      error: null,
      forecast: null,
    });
  });

  it('should handle forecast payload', () => {
    const payload = {
      cod: '200',
      cnt: 3,
      list: [
        {
          dt_txt: '2021-04-15 18:00:00',
          main: { temp: 250 },
        },
        {
          dt_txt: '2021-04-15 21:00:00',
          main: { temp: 230 },
        },
        {
          dt_txt: '2021-04-16 00:00:00',
          main: { temp: 220 },
        },
      ],
    };

    const expected = {
      ...payload,
      list: [
        {
          day: '15 Apr 21',
          data: [
            {
              dt_txt: '2021-04-15 18:00:00',
              main: { temp: 250 },
            },
            {
              dt_txt: '2021-04-15 21:00:00',
              main: { temp: 230 },
            },
          ],
        },
        {
          day: '16 Apr 21',
          data: [
            {
              dt_txt: '2021-04-16 00:00:00',
              main: { temp: 220 },
            },
          ],
        },
      ],
    };

    expect(
      dataReducer(undefined, { type: 'data/fetchForecast/fulfilled', payload })
    ).toEqual({
      loading: false,
      forecast: expected,
      error: null,
    });
  });

  it('should handle fetch error', () => {
    expect(
      dataReducer(undefined, { type: 'data/fetchForecast/rejected' })
    ).toEqual({
      loading: true,
      forecast: null,
      error: {
        message: 'Unable to get forecast. Please refresh and try again.',
      },
    });
  });

  describe('fetching forecast', () => {
    let dispatch = null;
    let getState = null;

    beforeEach(() => {
      dispatch = jest.fn();
      getState = jest.fn();
    });

    afterEach(() => {
      fetchMock.restore()
    });

    it('should dispatch fulfilled on successful response', async () => {
      const payload = {
        cod: '200',
        cnt: 3,
        list: [
          {
            dt_txt: '2021-04-15 18:00:00',
            main: { temp: 250 },
          },
          {
            dt_txt: '2021-04-15 21:00:00',
            main: { temp: 230 },
          },
          {
            dt_txt: '2021-04-16 00:00:00',
            main: { temp: 220 },
          },
        ],
      };

      fetchMock.getOnce(/\/forecast\?/, {
        status: 200,
        body: payload,
        headers: { 'content-type': 'application/json' },
      });

      const fetchAction = fetchForecast();
      const fetchPromise = fetchAction(dispatch, getState, undefined);
      const { requestId } = fetchPromise;

      await fetchPromise;

      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(
        1, fetchForecast.pending(requestId)
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2, fetchForecast.fulfilled(payload, requestId)
      );
    });

    it('should dispatch rejected on error response', async () => {
      fetchMock.getOnce(/\/forecast\?/, 500);

      const fetchAction = fetchForecast();
      const fetchPromise = fetchAction(dispatch, getState, undefined);
      const { requestId } = fetchPromise;

      await fetchPromise;

      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(
        1, fetchForecast.pending(requestId)
      );

      const errorAction = dispatch.mock.calls[1][0];
      expect(errorAction.type).toBe('data/fetchForecast/rejected');
      expect(errorAction.error?.message).toBe('Unable to fetch forecast');
      expect(errorAction.meta?.requestId).toBe(requestId);
    });
  });
});
