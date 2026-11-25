export function renderCourse(courseObj, containerId = "app") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const studentItems = courseObj.students
    .map((s) => `<li>${s.name}: <strong>${s.points} p</strong></li>`)
    .join("");

  container.innerHTML = `
    <h1>${courseObj.title}</h1>
    <p>Opettaja: ${courseObj.teacher.name} (${courseObj.teacher.subject})</p>
    <ul>${studentItems}</ul>
    <p>Kurssin keskiarvo: <strong>${courseObj.average} p</strong></p>
  `;
}