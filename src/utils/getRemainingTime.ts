import dayjs from 'dayjs';

const getRemainingTime = (stopsAt: string) => {
  let timeRemaining = dayjs(stopsAt).diff(dayjs(), 'seconds');

  if (timeRemaining < 0) timeRemaining = 0;

  return timeRemaining;
};

export default getRemainingTime;
