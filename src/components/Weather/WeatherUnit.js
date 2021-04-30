import {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectUnit, switchUnit } from '../../store/display';

const useStyles = makeStyles(() => ({
  row: {
    width: '100%',
    justifyContent: 'space-around',
  }
}));

const WeatherUnit = () => {
  const classes = useStyles();
  const unit = useSelector(selectUnit);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(switchUnit(event.target.value));
  };

  return (
    <Grid item container xs={12} md={10} lg={8}>
      <RadioGroup
        aria-label="unit"
        name="weather-unit"
        value={unit}
        onChange={handleChange}
        className={classes.row}
        row
      >
        <FormControlLabel value="F" control={<Radio color="primary" />} label="Farenheit" />
        <FormControlLabel value="C" control={<Radio color="primary" />} label="Celsius" />
      </RadioGroup>
    </Grid>
  )
};

export default WeatherUnit;
