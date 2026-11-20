export function laskeRivisumma(tuote) {
  return tuote.hinta * tuote.maara;
}

export function laskeYhteensa(tuotteet) {
  return tuotteet.reduce((summa, tuote) => summa + laskeRivisumma(tuote), 0);
}

export function muotoileEurot(summa) {
  return summa.toLocaleString("fi-FI", {
    style: "currency",
    currency: "EUR",
  });
}