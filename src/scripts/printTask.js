import { updateLocal } from './localStorage.js';
import { getElement, createElement } from './queries.js';

function printTask(task, tasks) {
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

export default printTask;