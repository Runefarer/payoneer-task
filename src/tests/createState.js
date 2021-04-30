const DEFAULT_DATA = {
  loading: true,
  error: null,
  forecast: null,
};

const DEFAULT_DISPLAY = {
  unit: 'F',
  pageSize: 3,
  pageIndex: 0,
  active: 0,
};

const createState = ({ data, display } = {}) => {
  return {
    data: data ? { ...DEFAULT_DATA, ...data } : DEFAULT_DATA,
    display: display ? { ...DEFAULT_DISPLAY, ...display } : DEFAULT_DISPLAY,
  };
};

export default createState;
