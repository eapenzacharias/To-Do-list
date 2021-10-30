import { getLocal, updateLocal } from './localStorage.js';
import printTask from './printTask.js';
import { getElement } from './queries.js';
import updateTasks from './tasks.js';

let tasks = [];

function printTasks() {
  const local = getLocal();
  if (local) {
    tasks = local;
  }
  tasks = updateTasks(tasks);
  getElement('#tasks').innerHTML = '';
  tasks.forEach((task) => printTask(task, tasks));
}

function taskFilter(list) {
  const local = getLocal();
  if (local) {
    list = local;
    tasks = local;
  }
  const filtered = list.filter((task) => !task.completed);
  updateLocal(filtered);
  printTasks();
}

function filterBtn(list = tasks) {
  const local = getLocal();
  if (local) {
    list = local;
    tasks = local;
  }
  const clearBtn = getElement('#clear-btn');
  clearBtn.onclick = () => taskFilter(list);
}

export { printTasks, filterBtn };