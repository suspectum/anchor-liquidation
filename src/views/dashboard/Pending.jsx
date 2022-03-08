import { useEffect, useState } from 'react';
import { intervalToDuration } from 'date-fns';
import { CircularProgress } from '@mui/material';

export const Pending = ({ timestamp }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const { minutes, seconds } = intervalToDuration({
    start: now,
    end: new Date(timestamp * 1000),
  });
  

  const fromNow = [minutes, seconds].map((str) => String(str).padStart(2, '0')).join(':');

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <CircularProgress size={24} thickness={2} />
      <p
        style={{
          paddingLeft: '5px',
        }}
      >
        Ready in {fromNow}
      </p>
    </div>
  );
};
