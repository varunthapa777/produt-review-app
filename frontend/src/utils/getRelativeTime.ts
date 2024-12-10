const getRelativeTime = (date: Date): string => {
  const currentDate = new Date();
  const utcCurrentDate = new Date(currentDate.toUTCString());
  const utcDate = new Date(date.toUTCString());
  const timeDifference = utcCurrentDate.getTime() - utcDate.getTime();

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format. Expected format: MM/DD/YYYY.");
  }

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks >= 1) {
    return `${weeks}w ago`;
  } else if (days >= 1) {
    return `${days}d ago`;
  } else if (hours >= 1) {
    return `${hours}h ago`;
  } else if (minutes >= 1) {
    return `${minutes}m ago`;
  } else {
    return `${seconds}s ago`;
  }
};

export default getRelativeTime;
