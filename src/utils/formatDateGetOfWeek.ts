export const formatDateGetOfWeek = (data: Date) => {
  const dayOfWeek = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];

  const newDate = new Date(data);

  return dayOfWeek[newDate.getDay()];
};
