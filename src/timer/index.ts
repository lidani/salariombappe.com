let interval: NodeJS.Timeout | undefined;

type Callback = () => void;

export const start = (callback: Callback, every = 1000) => {
  if (interval !== undefined) return;
  interval = setInterval(callback, every);
  return stop;
};

export const stop = () => (clearInterval(interval), (interval = undefined));

export const formatElapsedTime = (elapsedTimeInSeconds: number) => {
  const hours = Math.floor(elapsedTimeInSeconds / 3600);
  const minutes = Math.floor((elapsedTimeInSeconds - hours * 3600) / 60);
  const seconds = elapsedTimeInSeconds - hours * 3600 - minutes * 60;

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':');
};
