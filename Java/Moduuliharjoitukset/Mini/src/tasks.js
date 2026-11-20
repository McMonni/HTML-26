export function createTask(tasks, text) {
  const newTask = {
    id: crypto.randomUUID(),
    text,
    completed: false,
  };
  return [...tasks, newTask];
}

export function toggleTaskStatus(tasks, id) {
  return tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
}

export function removeTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}