class Student {
  #points; // Yksityinen kenttä pisteille

  constructor(name, points = 0, isActive = true) {
    this.name = name;
    this.isActive = isActive;
    // Estetään negatiiviset pisteet jo luontivaiheessa
    this.#points = points < 0 ? 0 : points;
  }

  addPoints(amount) {
    if (amount < 0) {
      console.log(`Virhe: Pisteitä ei voi lisätä negatiivisella määrällä (${amount}).`);
      return;
    }
    this.#points += amount;
  }

  greet() {
    const status = this.isActive ? "aktiivinen" : "ei-aktiivinen";
    console.log(`Hei! Olen ${this.name} (${status} opiskelija) ja minulla on ${this.#points} pistettä.`);
  }

  get grade() {
    // Oletetaan hyväksymisrajaksi esim. 50 pistettä
    return this.#points >= 50 ? "Hyväksytty" : "Hylätty";
  }
}

// 4. Luodaan kolme instanssia
const student1 = new Student("Aino", 40, true);
const student2 = new Student("Mikko", -15, true); // Negatiiviset pisteet nollataan
const student3 = new Student("Sari", 75, false);

// Testataan toiminnallisuutta
student1.greet();
console.log(`${student1.name} arvosana: ${student1.grade}`); // Hylätty

student1.addPoints(20);
console.log(`${student1.name} uusi arvosana: ${student1.grade}`); // Hyväksytty

student2.greet(); // Pisteet ovat 0
student2.addPoints(-10); // Estetään

student3.greet();
console.log(`${student3.name} arvosana: ${student3.grade}`); // Hyväksytty