import displayReducer, {
  activate,
  nextPage,
  prevPage,
  setPageSize,
  switchUnit,
} from './display';

describe('display reducer', () => {
  it('should handle initial state', () => {
    expect(displayReducer(undefined, { type: 'unknown' })).toEqual({
      unit: 'F',
      pageSize: 3,
      pageIndex: 0,
      active: 0,
    });
  });

  describe('switching unit', () => {
    it('should be handled correctly', () => {
      const initialState = {
        unit: 'F',
        pageSize: 3,
        pageIndex: 0,
        active: 0,
      };

      expect(displayReducer(initialState, switchUnit('C'))).toEqual({
        unit: 'C',
        pageSize: 3,
        pageIndex: 0,
        active: 0,
      });
    });

    it('should default to farenheit on invalid payload', () =>{
      const initialState = {
        unit: 'C',
        pageSize: 3,
        pageIndex: 0,
        active: 0,
      };

      expect(displayReducer(initialState, switchUnit('A'))).toEqual({
        unit: 'F',
        pageSize: 3,
        pageIndex: 0,
        active: 0,
      });
    });
  });

  describe('setting page size', () => {
    it('should be handled correctly', () => {
      const initialState = {
        unit: 'F',
        pageSize: 3,
        pageIndex: 0,
        active: 0,
      };

      expect(displayReducer(initialState, setPageSize(1))).toEqual({
        unit: 'F',
        pageSize: 1,
        pageIndex: 0,
        active: 0,
      });
    });

    it('should limit page size to 3 max', () => {
      const initialState = {
        unit: 'F',
        pageSize: 1,
        pageIndex: 0,
        active: 0,
      };

      expect(displayReducer(initialState, setPageSize(5))).toEqual({
        unit: 'F',
        pageSize: 3,
        pageIndex: 0,
        active: 0,
      });
    });

    it('should not change page index if page size decreases', () => {
      const initialState = {
        unit: 'F',
        pageSize: 3,
        pageIndex: 2,
        active: 2,
      };

      expect(displayReducer(initialState, setPageSize(1))).toEqual({
        unit: 'F',
        pageSize: 1,
        pageIndex: 2,
        active: 2,
      });
    });

    it('should update page index if page size increases', () => {
      const initialState = {
        unit: 'F',
        pageSize: 1,
        pageIndex: 5,
        active: 5,
      };

      expect(displayReducer(initialState, setPageSize(3))).toEqual({
        unit: 'F',
        pageSize: 3,
        pageIndex: 3,
        active: 5,
      });
    });

    it('should not update page index below 0 if page size increases', () => {
      const initialState = {
        unit: 'F',
        pageSize: 2,
        pageIndex: 0,
        active: 1,
      };

      expect(displayReducer(initialState, setPageSize(3))).toEqual({
        unit: 'F',
        pageSize: 3,
        pageIndex: 0,
        active: 1,
      });
    });

    it('should update active to fit page size', () => {
      const initialState = {
        unit: 'F',
        pageSize: 3,
        pageIndex: 0,
        active: 2,
      };

      expect(displayReducer(initialState, setPageSize(1))).toEqual({
        unit: 'F',
        pageSize: 1,
        pageIndex: 0,
        active: 0,
      });
    });
  });

  describe('going to previous page', () => {
    it('should be handled correctly', () => {
      const initialState = {
        unit: 'F',
        pageSize: 3,
        pageIndex: 2,
        active: 2,
      };

      expect(displayReducer(initialState, prevPage())).toEqual({
        unit: 'F',
        pageSize: 3,
        pageIndex: 1,
        active: 2,
      });
    });

    it('should not allow page index to be below 0', () => {
      const initialState = {
        unit: 'F',
        pageSize: 3,
        pageIndex: 0,
        active: 2,
      };

      expect(displayReducer(initialState, prevPage())).toEqual({
        unit: 'F',
        pageSize: 3,
        pageIndex: 0,
        active: 2,
      });
    });

    it('should update active to fit visible page', () => {
      const initialState = {
        unit: 'F',
        pageSize: 3,
        pageIndex: 2,
        active: 4,
      };

      expect(displayReducer(initialState, prevPage())).toEqual({
        unit: 'F',
        pageSize: 3,
        pageIndex: 1,
        active: 3,
      });
    });
  });

  describe('going to next page', () => {
    it('should be handled correctly', () => {
      const initialState = {
        unit: 'F',
        pageSize: 3,
        pageIndex: 0,
        active: 2,
      };

      expect(displayReducer(initialState, nextPage({ length: 5 }))).toEqual({
        unit: 'F',
        pageSize: 3,
        pageIndex: 1,
        active: 2,
      });
    });

    it('should not allow page index to be more than item length - page size', () => {
      const initialState = {
        unit: 'F',
        pageSize: 3,
        pageIndex: 3,
        active: 3,
      };

      expect(displayReducer(initialState, nextPage({ length: 6 }))).toEqual({
        unit: 'F',
        pageSize: 3,
        pageIndex: 3,
        active: 3,
      });
    });

    it('should update active to fit visible page', () => {
      const initialState = {
        unit: 'F',
        pageSize: 3,
        pageIndex: 2,
        active: 2,
      };

      expect(displayReducer(initialState, nextPage({ length: 6 }))).toEqual({
        unit: 'F',
        pageSize: 3,
        pageIndex: 3,
        active: 3,
      });
    });
  });

  describe('activating item', () => {
    it('should be handled correctly', () => {
      const initialState = {
        unit: 'F',
        pageSize: 3,
        pageIndex: 2,
        active: 2,
      };

      expect(displayReducer(initialState, activate(4))).toEqual({
        unit: 'F',
        pageSize: 3,
        pageIndex: 2,
        active: 4,
      });
    });

    it('should not allow active to be below page index', () => {
      const initialState = {
        unit: 'F',
        pageSize: 3,
        pageIndex: 2,
        active: 4,
      };

      expect(displayReducer(initialState, activate(1))).toEqual({
        unit: 'F',
        pageSize: 3,
        pageIndex: 2,
        active: 2,
      });
    });

    it('should not allow active to be >= page index + page size', () => {
      const initialState = {
        unit: 'F',
        pageSize: 3,
        pageIndex: 1,
        active: 1,
      };

      expect(displayReducer(initialState, activate(4))).toEqual({
        unit: 'F',
        pageSize: 3,
        pageIndex: 1,
        active: 3,
      });
    });
  });
});
