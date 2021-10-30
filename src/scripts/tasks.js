import { getLocal, updateLocal } from './localStorage.js';
import printTask from './printTask.js';
import { getElement } from './queries.js';

const taskInput = getElement('#task-input');

function getTask(tasks) {
  if (taskInput.value === null) {
    taskInput.placeholder = 'Please enter a valid task title';
  } else if (tasks.length === 0) {
    tasks.push({
      index: 1,
      description: taskInput.value,
      completed: false,
    });
  } else {
    tasks.push({
      index: tasks[tasks.length - 1].index + 1,
      description: taskInput.value,
      completed: false,
    });
  }
  printTask(tasks[tasks.length - 1], tasks);
  taskInput.value = '';
  updateLocal(tasks);
}

function updateTasks(tasks) {
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      getTask(tasks);
    }
  });
  return tasks;
}

export default updateTasks;