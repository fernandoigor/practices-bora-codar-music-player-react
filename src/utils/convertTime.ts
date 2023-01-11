export const toMinutes = (seconds: number) => {
  return `${Math.floor(seconds / 60)}:${
    Math.floor(seconds % 60) < 10
      ? "0" + Math.floor(seconds % 60)
      : Math.floor(seconds % 60)
  }`;
};
