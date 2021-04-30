import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, IconButton } from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { selectForecast } from '../../store/data';
import { nextPage, prevPage, selectPageIndex, selectPageSize } from '../../store/display';

const WeatherControl = () => {
  const pageIndex = useSelector(selectPageIndex);
  const pageSize = useSelector(selectPageSize);
  const forecast = useSelector(selectForecast);
  const dispatch = useDispatch();

  const length = forecast?.list?.length;
  
  const handlePrev = () => {
    dispatch(prevPage({ length }));
  };
  
  const handleNext = () => {
    dispatch(nextPage({ length }));
  };
  
  return (
    <Grid container item>
      {
        length && pageIndex > 0 && (
          <IconButton aria-label="Previous page" color="primary" onClick={handlePrev}>
            <ArrowBack fontSize="large" />
          </IconButton>
        )
      }
      <Box flexGrow={1} />
      {
        length && (pageIndex + pageSize < length) && (
          <IconButton aria-label="Next page" color="primary" onClick={handleNext}>
            <ArrowForward fontSize="large" />
          </IconButton>
        )
      }
    </Grid>
  )
};

export default WeatherControl;
