import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import reducer from '../store/reducer';

const renderWithState = (ui, {
  initialState,
  store = configureStore({ reducer, preloadedState: initialState }),
  ...renderOptions
} = {}) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return { 
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    store, 
  };
};

export default renderWithState;
