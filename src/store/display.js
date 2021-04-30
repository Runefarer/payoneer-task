import { createSlice } from '@reduxjs/toolkit';
import { clampIndex } from '../shared/helpers';

const initialState = {
  unit: 'F',
  pageSize: 3,
  pageIndex: 0,
  active: 0,
};

const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    switchUnit: (state, action) => {
      state.unit = ['F', 'C'].includes(action.payload) ? action.payload : 'F';
    },
    setPageSize: (state, action) => {
      state.pageSize = Math.min(action.payload, 3);
      if (state.pageIndex + state.pageSize - 1 > state.active) {
        state.pageIndex = Math.max(0, state.active - state.pageSize + 1);
      }
      state.active = clampIndex(
        state.active, state.pageIndex, state.pageIndex + state.pageSize,
      );
    },
    prevPage: (state) => {
      state.pageIndex = Math.max(0, state.pageIndex - 1);
      state.active = clampIndex(
        state.active, state.pageIndex, state.pageIndex + state.pageSize,
      );
    },
    nextPage: (state, action) => {   
      state.pageIndex = Math.min(
        action.payload.length - state.pageSize, state.pageIndex + 1
      );
      state.active = clampIndex(
        state.active, state.pageIndex, state.pageIndex + state.pageSize,
      );
    },
    activate: (state, action) => {
      state.active = clampIndex(
        action.payload, state.pageIndex, state.pageIndex + state.pageSize,
      );
    },
  },
});

export const {
  switchUnit,
  setPageSize,
  prevPage,
  nextPage,
  activate,
} = displaySlice.actions;

export const selectUnit = (state) => state.display.unit;
export const selectPageSize = (state) => state.display.pageSize;
export const selectPageIndex = (state) => state.display.pageIndex;
export const selectActive = (state) => state.display.active;

export default displaySlice.reducer;
