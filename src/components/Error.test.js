import { fireEvent, waitFor } from '@testing-library/dom';
import { createState, renderWithState } from '../tests';
import Error from './Error';

describe('Error', () => {
  it('should not be displayed when no error', () => {
    const { queryByText, queryByTitle } = renderWithState(<Error />, {
      initialState: createState(),
    });
  
    expect(queryByText('An error occurred.')).toBeNull();
    expect(queryByTitle('Close')).toBeNull();
  });

  it('should display error', () => {
    const { queryByText, queryByTitle } = renderWithState(<Error />, {
      initialState: createState({
        data: {
          error: {
            message: 'An error occurred.',
          },
        },
      }),
    });
  
    expect(queryByText('An error occurred.')).toBeVisible();
    expect(queryByTitle('Close')).toBeVisible();
  });

  it('should hide on close', async () => {
    const { queryByText, queryByTitle } = renderWithState(<Error />, {
      initialState: createState({
        data: {
          error: {
            message: 'An error occurred.',
          },
        },
      }),
    });
  
    fireEvent.click(queryByTitle('Close'));

    await waitFor(() => {
      expect(queryByText('An error occurred.')).toBeNull();
      expect(queryByTitle('Close')).toBeNull();
    });
  });
});
