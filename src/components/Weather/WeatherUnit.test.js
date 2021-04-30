import { fireEvent } from '@testing-library/dom';
import { createState, renderWithState } from '../../tests';
import WeatherUnit from './WeatherUnit';

describe('Weather Unit', () => {
  it('should have Farenheit checked given F as unit', () => {
    const { queryByLabelText } = renderWithState(<WeatherUnit />, {
      initialState: createState({
        display: { unit: 'F' },
      }),
    });
  
    const farenheit = queryByLabelText('Farenheit');
    const celsius = queryByLabelText('Celsius');

    expect(farenheit).toBeInTheDocument();
    expect(farenheit.checked).toBe(true);

    expect(celsius).toBeInTheDocument();
    expect(celsius.checked).toBe(false);
  });

  it('should have Celsius checked given C as unit', () => {
    const { queryByLabelText } = renderWithState(<WeatherUnit />, {
      initialState: createState({
        display: { unit: 'C' },
      }),
    });
  
    const farenheit = queryByLabelText('Farenheit');
    const celsius = queryByLabelText('Celsius');

    expect(farenheit).toBeInTheDocument();
    expect(farenheit.checked).toBe(false);

    expect(celsius).toBeInTheDocument();
    expect(celsius.checked).toBe(true);
  });

  it('should update state on change', () => {
    const { queryByLabelText, store } = renderWithState(<WeatherUnit />, {
      initialState: createState({
        display: { unit: 'F' },
      }),
    });
  
    const farenheit = queryByLabelText('Farenheit');
    const celsius = queryByLabelText('Celsius');

    expect(store.getState().display.unit).toBe('F');
    expect(farenheit.checked).toBe(true);
    expect(celsius.checked).toBe(false);

    fireEvent.click(celsius);

    expect(store.getState().display.unit).toBe('C');
    expect(farenheit.checked).toBe(false);
    expect(celsius.checked).toBe(true);

    fireEvent.click(farenheit);

    expect(store.getState().display.unit).toBe('F');
    expect(farenheit.checked).toBe(true);
    expect(celsius.checked).toBe(false);
  });
});
