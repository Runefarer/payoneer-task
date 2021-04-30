import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { selectPageSize, selectUnit } from '../../store/display';
import { kelvinToCelsius, kelvinToFarenheit } from '../../shared/temperature';
import { iconUrl, sortByCountDesc } from '../../shared/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    flexShrink: 0,
    cursor: 'pointer',
  },
  active: {
    borderColor: theme.palette.primary.main,
    borderWidth: '3px',
    borderStyle: 'solid',
  },
  cardContent: {
    position: 'relative',
  },
  weather: {
    backgroundColor: '#CFD8DC',
    margin: '4px',
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  avgWeather: {
    position: 'absolute',
    margin: 0,
    top: theme.spacing(2),
    right: theme.spacing(2),
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

const WeatherCard = ({ day, data, active, onActivate }) => {
  const classes = useStyles();
  const pageSize = useSelector(selectPageSize);
  const unit = useSelector(selectUnit);
  const [temp, setTemp] = useState(0);

  const handleClick = () => {
    if (typeof onActivate === 'function') {
      onActivate();
    }
  };

  const avgTemp = useMemo(() => {
    return data.reduce((acc, val) => acc + val.main.temp, 0) / data.length;
  }, [data]);

  const avgWeather = useMemo(() => {
    // avgWeather is the weather with the most frequent icon of the most frequent weather type
    const weathers = {};
    data.forEach((slice) => {
      const weather = slice.weather[0];

      // count weathers by weather type
      weathers[weather.main] = weathers[weather.main] || { count: 0, types: {} };
      weathers[weather.main].count++;
      
      // for each weather type, count by weather icon
      if (!weathers[weather.main].types[weather.icon]) {
        weathers[weather.main].types[weather.icon] = { count: 0, weather };
      }
      weathers[weather.main].types[weather.icon].count++;
    });

    // select the most frequent weather type
    const sortedByMain = Object.values(weathers).sort(sortByCountDesc);
    // select the most frequent icon within the most frequent weather type
    const sortedByIcon = Object.values(sortedByMain[0].types).sort(sortByCountDesc);

    return sortedByIcon[0].weather;
  }, [data]);

  useEffect(() => {
    if (unit === 'F') {
      setTemp(kelvinToFarenheit(avgTemp));
    } else {
      setTemp(kelvinToCelsius(avgTemp));
    }
  }, [avgTemp, unit]);

  return (
    <Grid item xs={12/pageSize} className={classes.root} onClick={handleClick}>
      <Card raised={active} className={active ? classes.active : ''} data-testid="card">
        <CardContent className={classes.cardContent}>
          <Box width={1} p={1}>
            <Avatar
              alt={avgWeather.description}
              src={iconUrl(avgWeather.icon)}
              className={`${classes.weather} ${classes.avgWeather}`}
            />
            <Box width={1} px={1} pb={1}>
              <Grid container direction="column" alignItems="center">
                <Typography variant="subtitle1">Temp</Typography>
                <Typography variant="h4">{temp}{unit}</Typography>
              </Grid>
            </Box>
            <Box width={1} px={1} py={1}>
              <Grid container direction="column" alignItems="center">
                <Typography variant="subtitle1">Date</Typography>
                <Typography variant="h4">{day}</Typography>
              </Grid>
            </Box>
            <Box width={1} px={1} pt={1}>
              <Grid>
                <Grid container alignItems="center" justify="center">
                  {
                    data.slice(0, Math.floor(data.length/2)).map((slice, index) => (
                      <Avatar
                        key={`${slice.weather[0].id}-${index}`}
                        alt={slice.weather[0].description}
                        src={iconUrl(slice.weather[0].icon)}
                        className={classes.weather}
                      />
                    ))
                  }
                </Grid>
                <Grid container alignItems="center" justify="center">
                  {
                    data.slice(Math.floor(data.length/2)).map((slice, index) => (
                      <Avatar
                        key={`${slice.weather[0].id}-${index}`}
                        alt={slice.weather[0].description}
                        src={iconUrl(slice.weather[0].icon)}
                        className={classes.weather}
                      />
                    ))
                  }
                </Grid>
              </Grid>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WeatherCard;
