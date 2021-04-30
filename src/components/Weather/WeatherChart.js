import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Bar } from 'react-chartjs-2';
import { kelvinToCelsius, kelvinToFarenheit } from '../../shared/temperature';
import { selectForecast } from '../../store/data';
import { selectActive, selectUnit } from '../../store/display';
import { getTime } from '../../shared/datetime';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '75%',
    },
  },
  container: {
    [theme.breakpoints.up('xs')]: {
      height: '25vh',
    },
    [theme.breakpoints.up('sm')]: {
      height: '30vh',
    },
    [theme.breakpoints.up('md')]: {
      height: '40vh',
    },
  },
}));

const WeatherChart = () => {
  const theme = useTheme();
  const classes = useStyles();
  const forecast = useSelector(selectForecast);
  const unit = useSelector(selectUnit);
  const active = useSelector(selectActive);
  const [data, setData] = useState();

  const baseData = useMemo(() => {
    if (!forecast?.list?.length) {
      return;
    }

    return forecast.list[active].data.map((slice) => {
      const time = getTime(slice.dt_txt);
      const temp = unit === 'F'
        ? kelvinToFarenheit(slice.main.temp)
        : kelvinToCelsius(slice.main.temp)

      return { temp, time };
    });
  }, [forecast, unit, active]);

  useEffect(() => {
    if (!baseData) {
      return;
    }

    setData({
      labels: baseData.map(({temp}) => `${temp}${unit}`),
      datasets: [{
        data: baseData.map(({temp}) => temp),
      }],
    });
  }, [baseData, unit]);

  return (
    <Box py={4} className={classes.root}>
      <Paper className={classes.container}>
        {
          data && (
            <Bar
              data={data}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: { display: false },
                  x: {
                    ticks: {
                      font: { size: 16 },
                    },
                  },
                },
                elements: {
                  bar: {
                    backgroundColor: theme.palette.primary.main,
                  },
                },
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    displayColors: false,
                    callbacks: {
                      title: () => '',
                      label: (context) => {
                        const { time, temp } = baseData[context.dataIndex];
                        return `${time} - ${temp}${unit}`;
                      },
                    },
                  },
                },
              }}
            />
          )
        }
      </Paper>
    </Box>
  );
};

export default WeatherChart;
