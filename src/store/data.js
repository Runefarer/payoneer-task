import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getForecast } from '../shared/api';
import { getDay } from '../shared/datetime';

const initialState = {
  loading: true,
  error: null,
  forecast: null,
};

export const fetchForecast = createAsyncThunk(
  'data/fetchForecast',
  async (location) => {
    const forecast = await getForecast(location);
    if (forecast.cod !== '200') {
      throw new Error(`Error in forecast - ${forecast.cod} - ${forecast.message}`);
    }
    return forecast;
  },
);

// We are able to 'mutate' state here as createSlice uses Immer for immutability
const dataSlice = createSlice({
  name: 'data',
  initialState,
  extraReducers: {
    [fetchForecast.fulfilled]: (state, action) => {
      const { list } = action.payload;
      
      const dayMap = {};
      for (let i = 0; i < list.length; i++) {
        const day = getDay(list[i].dt_txt);
        
        dayMap[day] = dayMap[day] || [];
        dayMap[day].push(list[i]);
      }
      
      const dayList = [];
      for (let day in dayMap) {
        dayList.push({
          day,
          data: dayMap[day],
        });
      }
      
      state.loading = false;
      state.forecast = { ...action.payload, list: dayList };
    },
    [fetchForecast.rejected]: (state) => {
      state.error = {
        message: 'Unable to get forecast. Please refresh and try again.',
      };
    },
  },
});

export const selectLoading = (state) => state.data.loading;
export const selectError = (state) => state.data.error;
export const selectForecast = (state) => state.data.forecast;

export default dataSlice.reducer;
