const DEFAULT_SETTINGS = {
  theme: "light",
  notifications: true
};

function loadSettings() {
  try {
    // 1. Lue settings localStoragesta
    const raw = localStorage.getItem("settings");

    // 2. Jos arvo puuttuu (on null tai tyhjä), palauta oletusasetukset
    if (!raw) {
      return { ...DEFAULT_SETTINGS };
    }

    const parsed = JSON.parse(raw);

    // Haaste: Tarkista, että arvo on oikea objekti (ei null eikä taulukko)
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      console.warn("Asetukset eivät ole kelvollinen objekti, käytetään oletuksia.");
      return { ...DEFAULT_SETTINGS };
    }

    // Haaste: Tarkista, että objekti sisältää kaikki odotetut avaimet
    const expectedKeys = Object.keys(DEFAULT_SETTINGS);
    const hasAllKeys = expectedKeys.every((key) => key in parsed);

    if (!hasAllKeys) {
      console.warn("Asetuksista puuttuu odotettuja avaimia, käytetään oletuksia.");
      return { ...DEFAULT_SETTINGS };
    }

    return parsed;
  } catch (error) {
    // 3. & 4. Jos JSON.parse (tai localStorage) epäonnistuu, lokita virhe ja palauta oletukset
    console.error("Virhe asetusten lukemisessa:", error);
    return { ...DEFAULT_SETTINGS };
  }
}