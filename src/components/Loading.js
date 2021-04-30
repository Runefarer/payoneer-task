import { useSelector } from 'react-redux';
import {
  Box,
  CircularProgress,
  Fade,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { selectLoading } from '../store/data';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    position: 'absolute',
  },
}));

const Loading = () => {
  const classes = useStyles();
  const loading = useSelector(selectLoading);

  return (
    <Fade in={loading} timeout={{enter: 10, exit: 1000}}>
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        className={classes.root}
      >
        <Box p={2}>
          <CircularProgress size={60} />
        </Box>
        <Typography variant="h4">Loading...</Typography>
      </Grid>
    </Fade>
  );
};

export default Loading;
