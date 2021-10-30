import { getLocal } from './localStorage.js';
import printTask from './printTask.js';
import updateTasks from './tasks.js';

let tasks = [];

function printTasks() {
  const local = getLocal();
  if (local) {
    tasks = local;
  }
  tasks = updateTasks(tasks);
  tasks.forEach((task) => printTask(task, tasks));
}

export default printTasks;