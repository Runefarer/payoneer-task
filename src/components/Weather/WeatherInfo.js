import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { selectForecast } from '../../store/data';
import {
  activate,
  selectActive,
  selectPageIndex,
  selectPageSize,
  setPageSize,
} from '../../store/display';
import WeatherControl from './WeatherControl';
import WeatherCard from './WeatherCard';

const useStyles = makeStyles(() => ({
  wrapper: {
    overflow: 'hidden',
    width: '100%',
  },
  cards: {
    flexWrap: 'nowrap',
    transition: 'transform 0.5s cubic-bezier(0.3, -0.5, 0.7, 1.5)'
  },
}));

const WeatherInfo = () => {
  const theme = useTheme();
  const classes = useStyles();
  const matchesLg = useMediaQuery(theme.breakpoints.up('lg'));
  const matchesMd = useMediaQuery(theme.breakpoints.up('md'));
  const matchesSm = useMediaQuery(theme.breakpoints.up('sm'));

  const forecast = useSelector(selectForecast);
  const pageIndex = useSelector(selectPageIndex);
  const pageSize = useSelector(selectPageSize);
  const active = useSelector(selectActive);
  const dispatch = useDispatch();

  const handleActivate = (index) => {
    dispatch(activate(index));  
  };

  useEffect(() => {
    if (matchesLg) {
      dispatch(setPageSize(3));
    } else if (matchesMd) {
      dispatch(setPageSize(2));
    } else {
      dispatch(setPageSize(1));
    }
  }, [matchesLg, matchesMd, matchesSm, dispatch]);

  return (
    <Grid container direction="column">
      <WeatherControl />
      <Box className={classes.wrapper}>
        <Grid
          container
          className={classes.cards}
          style={{transform: `translateX(${-100 * pageIndex / pageSize}%)`}}
        >
          {
            forecast?.list?.length && forecast.list.map(({day, data}, index) => (
              <WeatherCard
                key={day}
                day={day}
                data={data}
                active={active === index}
                onActivate={() => handleActivate(index)}
              />
            ))
          }
        </Grid>
      </Box>
    </Grid>
  )
};

export default WeatherInfo;
