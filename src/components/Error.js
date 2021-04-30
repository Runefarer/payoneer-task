import { useEffect, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { selectError } from '../store/data';

const Error = () => {
  const error = useSelector(selectError);
  const [shown, setShown] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = () => {
    setShown(false);
  };

  useEffect(() => {
    if (error) {
      setShown(true);
      setMessage(error.message ?? 'An error occured. Please refresh and try again.');
    }
  }, [error]);

  return (
    <Snackbar open={shown} onClose={handleClose}>
      <Alert variant="filled" severity="error" onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Error;
