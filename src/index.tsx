const test = (): string => {
  return "test";
};

const other = (): void => {
  alert(test());
};

export { other };
