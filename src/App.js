import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { fetchForecast } from './store/data';
import { Weather } from './components/Weather';
import Loading from './components/Loading';
import Error from './components/Error';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchForecast());
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <Loading />
      <Weather />
      <Error />
    </>
  );
}

export default App;
