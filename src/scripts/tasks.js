import { updateLocal, getLocal } from './localStorage.js';
import { createElement, getElement } from './queries.js';

let tasks = [
  {
    index: 1,
    description: 'Lorem 1 ipsum dolor sit amet.',
    completed: true,
  },
  {
    index: 2,
    description: 'Lorem 2 ipsum dolor sit amet.',
    completed: false,
  },
  {
    index: 3,
    description: 'Lorem 3 ipsum dolor sit amet.',
    completed: true,
  },
  {
    index: 4,
    description: 'Lorem 4 ipsum dolor sit amet.',
    completed: false,
  },
  {
    index: 5,
    description: 'Lorem 5 ipsum dolor sit amet.',
    completed: true,
  },
  {
    index: 6,
    description: 'Lorem 6 ipsum dolor sit amet.',
    completed: false,
  },
];

const local = getLocal();
if (local !== -1) {
  tasks = local;
}

function printTask(task) {
  const objIndex = tasks.findIndex((obj) => obj.index === task.index);
  const li = createElement('li');
  const done = createElement('input');
  done.type = 'checkbox';
  done.checked = task.completed;
  if (task.completed) li.classList.add('completed');
  done.addEventListener('change', () => {
    li.classList.toggle('completed');
    if (done.checked) {
      tasks[objIndex].completed = true;
      updateLocal(tasks);
    } else {
      tasks[objIndex].completed = false;
      updateLocal(tasks);
    }
  });
  const description = createElement('span');
  description.innerHTML = task.description;
  const menu = createElement('span');
  menu.innerHTML = '⋮';
  menu.className = 'task-options';
  li.appendChild(done);
  li.appendChild(description);
  li.appendChild(menu);
  getElement('#tasks').appendChild(li);
}

function printTasks() {
  const local = getLocal();
  if (local !== -1) {
    tasks = local;
  }
  tasks.forEach((task) => printTask(task));
}
export default printTasks;