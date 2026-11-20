const STORAGE_KEY = "todo-tasks";

export function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const tasks = saved ? JSON.parse(saved) : [];
    return Array.isArray(tasks) ? tasks : [];
  } catch (error) {
    console.error("Lataus epäonnistui:", error);
    return [];
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}