export const useTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};