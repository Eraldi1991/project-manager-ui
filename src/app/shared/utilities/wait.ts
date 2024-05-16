//Returns a promise that resolved after the provided time in milliseconds
export function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
