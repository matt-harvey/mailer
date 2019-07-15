function log(...args) {
  const now = new Date();
  console.log(`[${now}]:`, ...args);
}

export default log;
