export const FormatDateToBackend = (scheduleDate: Date) => {
  const year = scheduleDate.getFullYear();
  const month = (scheduleDate.getMonth() + 1).toString().padStart(2, "0");
  const day = scheduleDate.getDate();
  return `${year}-${month}-${day}`;
};
