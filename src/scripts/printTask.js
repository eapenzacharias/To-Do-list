import { getLocal, updateLocal } from './localStorage.js';
import { getElement, createElement } from './queries.js';
import newIndex from './updateIndex.js';

function deleteTask(task, tasks) {
  const objIndex = tasks.findIndex((obj) => obj.index === task.index);
  const local = getLocal();
  if (local) {
    tasks = local;
  }
  tasks.splice(objIndex, 1);
  newIndex(tasks);
}

function editTask(menu, description, tasks, objIndex) {
  const local = getLocal();
  if (local) {
    tasks = local;
  }
  if (menu.innerHTML === '⋮') {
    menu.innerHTML = '&#10004;';
    description.contentEditable = true;
  } else {
    menu.innerHTML = '⋮';
    description.contentEditable = false;
    tasks[objIndex].description = description.innerText;
  }
  updateLocal(tasks);
}

function printTask(task, tasks) {
  const objIndex = tasks.findIndex((obj) => obj.index === task.index);
  const li = createElement('li');
  const done = createElement('input');
  done.type = 'checkbox';
  done.checked = task.completed;
  if (task.completed) li.classList.add('completed');
  done.addEventListener('change', () => {
    li.classList.toggle('completed');
    const local = getLocal();
    if (local) {
      tasks = local;
    }
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
  menu.addEventListener('click', () => {
    editTask(menu, description, tasks, objIndex);
  });
  const delBtn = createElement('span');
  delBtn.innerHTML = '&#10005;';
  delBtn.className = 'del-btn';
  delBtn.addEventListener('click', () => {
    deleteTask(task, tasks);
    delBtn.parentElement.remove(delBtn);
  });
  li.appendChild(done);
  li.appendChild(description);
  li.appendChild(menu);
  li.appendChild(delBtn);
  getElement('#tasks').appendChild(li);
}

export default printTask;