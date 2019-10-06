// throw on console.warn/error
// to force the failure of the test(s)
const { warn } = global.console;
global.console.warn = (...args) => {
  warn.apply(console, args);
  throw args[0] instanceof Error ? args[0] : new Error(args[0].message);
};
const { error } = global.console;
global.console.error = (...args) => {
  error.apply(console, args);
  throw args[0] instanceof Error ? args[0] : new Error(args[0].message);
};
