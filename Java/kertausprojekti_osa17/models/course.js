import { Student } from "./student.js";
import { Teacher } from "./teacher.js";

export class Course {
  constructor(title, teacher) {
    this.title = title;
    this.teacher = teacher;
    this.students = [];
  }

  addStudent(student) {
    this.students.push(student);
  }

  get average() {
    if (this.students.length === 0) return 0;
    const sum = this.students.reduce((acc, s) => acc + s.points, 0);
    return (sum / this.students.length).toFixed(1);
  }

  toJSONString() {
    return JSON.stringify({
      title: this.title,
      teacher: { name: this.teacher.name, subject: this.teacher.subject },
      students: this.students
    });
  }

  static fromJSONString(jsonString) {
    const data = JSON.parse(jsonString);
    const teacher = new Teacher(data.teacher.name, data.teacher.subject);
    const course = new Course(data.title, teacher);

    data.students.forEach((studentData) => {
      course.addStudent(Student.fromJSON(studentData));
    });

    return course;
  }
}