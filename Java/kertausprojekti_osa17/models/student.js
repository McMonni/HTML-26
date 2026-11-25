import { Person } from "./person.js";

export class Student extends Person {
  #points;

  constructor(name, points = 0) {
    super(name);
    this.#points = points < 0 ? 0 : points;
  }

  get points() {
    return this.#points;
  }

  setPoints(newPoints) {
    if (newPoints < 0) return;
    this.#points = newPoints;
  }

  toJSON() {
    return {
      name: this.name,
      points: this.#points
    };
  }

  static fromJSON(data) {
    const obj = typeof data === "string" ? JSON.parse(data) : data;
    return new Student(obj.name, obj.points);
  }
}