import { loadTasks, saveTasks } from "./storage.js";
import { createTask, toggleTaskStatus, removeTask } from "./tasks.js";
import { renderTasks } from "./taskView.js";

function init() {
  let tasks = loadTasks();

  function updateApp() {
    saveTasks(tasks);
    renderTasks(tasks, handleToggle, handleDelete);
  }

  function handleToggle(id) {
    tasks = toggleTaskStatus(tasks, id);
    updateApp();
  }

  function handleDelete(id) {
    tasks = removeTask(tasks, id);
    updateApp();
  }

  renderTasks(tasks, handleToggle, handleDelete);

  const form = document.getElementById("task-form");
  const input = document.getElementById("task-input");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = input.value.trim();
    if (text === "") return;

    tasks = createTask(tasks, text);
    updateApp();

    input.value = "";
    input.focus();
  });
}

init();