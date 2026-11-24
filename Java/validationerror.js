class ValidationError extends Error {
  constructor(message, field, code = "VALIDATION_ERROR") {
    super(message); // Kutsuu Error-kantaluokan rakentajaa
    this.name = "ValidationError";
    this.field = field;
    this.code = code;
  }
}

// 2. & 3. Validoidaan tilaus ja heitetään virhe oikealla field- ja code-arvolla
function validateOrder(order) {
  if (!order || typeof order !== "object") {
    throw new Error("Virheellinen tilausobjekti."); // Tekninen virhe
  }

  // Tarkistetaan productId
  if (!order.productId || String(order.productId).trim() === "") {
    throw new ValidationError(
      "Tuotevalinta puuttuu.",
      "productId",
      "REQUIRED_FIELD"
    );
  }

  // Tarkistetaan quantity > 0
  if (typeof order.quantity !== "number" || order.quantity <= 0) {
    throw new ValidationError(
      "Määrän täytyy olla suurempi kuin 0.",
      "quantity",
      "INVALID_QUANTITY"
    );
  }

  // Tarkistetaan customer.email
  const email = order.customer?.email;
  if (!email || !email.includes("@")) {
    throw new ValidationError(
      "Syötä kelvollinen sähköpostiosoite.",
      "customer.email",
      "INVALID_EMAIL"
    );
  }

  return true;
}

// 4. & 5. Esimerkki käytöstä: kenttäkohtainen virhe vs. yleisvirhe
function submitOrder(order) {
  try {
    validateOrder(order);
    console.log("Tilaus hyväksytty ja lähetetty!");
  } catch (error) {
    if (error instanceof ValidationError) {
      // Käyttäjän korjattava virhe -> näytetään kenttäkohtainen viesti
      console.warn(
        `Virhe kentässä [${error.field}] (${error.code}): ${error.message}`
      );
      // Käyttöliittymässä esim: showFieldError(error.field, error.message);
    } else {
      // Tekninen / muu odottamaton virhe -> yleisvirhe käyttäjälle
      console.error("Tekninen virhe tilauksen käsittelyssä:", error);
      // Käyttöliittymässä esim: showGeneralError("Tapahtui odottamaton virhe. Yritä myöhemmin uudelleen.");
    }
  }
}

// --- Testaus ---

// Testi 1: Puuttuva sähköposti (ValidationError)
submitOrder({
  productId: "ABC-123",
  quantity: 2,
  customer: { email: "virheellinen-osoite" }
});

// Testi 2: Tekninen virhe, esim. null (yleisvirhe)
submitOrder(null);