export const ArraySeatsFilter = (sector: string, office: string) => {
  const spArraySeats = [];

  if (office === "1") {
    if (sector === "1")
      for (let i = 0; i < 60; i++) {
        spArraySeats.push(i + 1);
      }
    else if (sector === "2")
      for (let i = 0; i < 60; i++) {
        spArraySeats.push(i + 61);
      }
    else if (sector === "3")
      for (let i = 0; i < 60; i++) {
        spArraySeats.push(i + 121);
      }
    else if (sector === "4")
      for (let i = 0; i < 60; i++) {
        spArraySeats.push(i + 181);
      }
  }
  if (office === "2") {
    if (sector === "1")
      for (let i = 0; i < 20; i++) {
        spArraySeats.push(i + 1);
      }
    else if (sector === "2")
      for (let i = 0; i < 20; i++) {
        spArraySeats.push(i + 21);
      }
  }

  return spArraySeats;
};
