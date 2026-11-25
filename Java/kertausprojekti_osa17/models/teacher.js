import { Person } from "./person.js";

export class Teacher extends Person {
  constructor(name, subject) {
    super(name);
    this.subject = subject;
  }

  gradeStudent(student, points) {
    student.setPoints(points);
  }
}