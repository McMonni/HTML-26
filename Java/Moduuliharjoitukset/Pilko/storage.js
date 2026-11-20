const STORAGE_KEY = "ostoskorinTuotteet";

// Jaetaan latausfunktio ulos
export function lataaTuotteet() {
  try {
    const tallennetut = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(tallennetut) ? tallennetut : [];
  } catch (virhe) {
    console.error("Tallennettuja tuotteita ei voitu lukea:", virhe);
    return [];
  }
}

// Jaetaan tallennusfunktio ulos (ottaa tuotteet-listan parametrina)
export function tallennaTuotteet(tuotteet) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tuotteet));
}