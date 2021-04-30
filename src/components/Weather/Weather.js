import { useSelector } from 'react-redux';
import { Box, Fade, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { selectLoading } from '../../store/data';
import WeatherUnit from './WeatherUnit';
import WeatherInfo from './WeatherInfo';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
  },
}));

const Weather = () => {
  const classes = useStyles();
  const loading = useSelector(selectLoading);

  return (
    <Fade in={!loading} timeout={{enter: 2000}}>
      <Box
        py={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Grid
          container
          item
          direction="column"
          alignItems="center"
          xs={10}
          className={classes.root}
        >
          <WeatherUnit />
          <WeatherInfo />
        </Grid>
      </Box>
    </Fade>
  );
};

export default Weather;
