import { Student } from "./models/student.js";
import { Teacher } from "./models/teacher.js";
import { Course } from "./models/course.js";
import { renderCourse } from "./models/ui.js";

const teacher = new Teacher("Pekka", "Olio-ohjelmointi");
const course = new Course("JavaScript Syventävä", teacher);

const s1 = new Student("Aino");
const s2 = new Student("Mikko");
const s3 = new Student("Sari");

course.addStudent(s1);
course.addStudent(s2);
course.addStudent(s3);

teacher.gradeStudent(s1, 88);
teacher.gradeStudent(s2, 64);
teacher.gradeStudent(s3, 95);

// Tallennus ja palautus JSON-muodossa
localStorage.setItem("courseData", course.toJSONString());
const restoredCourse = Course.fromJSONString(localStorage.getItem("courseData"));

// Renderöinti DOMiin
renderCourse(restoredCourse);