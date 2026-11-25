// Yliluokka
class Person {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `Hei, nimeni on ${this.name}.`;
  }
}

// Aliluokka: Student
class Student extends Person {
  constructor(name, course) {
    super(name); // Kutsutaan yliluokan konstruktoria
    this.course = course;
  }

  study() {
    console.log(`${this.name} opiskelee kurssia ${this.course}.`);
  }

  // Ylikirjoitetaan introduce() ja laajennetaan yliluokan tulosta
  introduce() {
    return `${super.introduce()} Olen opiskelija ja kurssini on ${this.course}.`;
  }
}

// Aliluokka: Teacher
class Teacher extends Person {
  constructor(name, subject) {
    super(name); // Kutsutaan yliluokan konstruktoria
    this.subject = subject;
  }

  teach() {
    console.log(`${this.name} opettaa ainetta ${this.subject}.`);
  }

  // Ylikirjoitetaan introduce() ja laajennetaan yliluokan tulosta
  introduce() {
    return `${super.introduce()} Olen opettaja ja opetan ainetta ${this.subject}.`;
  }
}

// Testataan luokkia
const person = new Person("Matti");
const student = new Student("Aino", "Ohjelmoinnin perusteet");
const teacher = new Teacher("Pekka", "Tietorakenteet");

console.log(person.introduce());
console.log(student.introduce());
student.study();

console.log(teacher.introduce());
teacher.teach();