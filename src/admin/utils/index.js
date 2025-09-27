export const generateYears = () => {
  const currentYear = new Date().getFullYear();

  const years = [];

  for (let i = 1990; i <= currentYear; i++) {
    years.push(i);
  }

  return years;
};
