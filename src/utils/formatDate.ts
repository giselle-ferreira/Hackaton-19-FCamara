export const formatDate = (date: Date) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = (newDate.getMonth() +1).toString().padStart(2, "0");
  const year = newDate.getFullYear();
  return `${day}/${month}/${year}`;
};