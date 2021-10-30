import { getLocal, updateLocal } from './localStorage';
import printTasks from './printTasks';
import { getElement } from './queries';

const tasks = getLocal;

function taskFilter() {
  const filtered = tasks.filter((task) => task.completed === true);
  updateLocal(filtered);
  printTasks();
}

function filterBtn() {
  const clearBtn = getElement('#clear-btn');
  clearBtn.addEventListener('click', taskFilter());
}

export default filterBtn;