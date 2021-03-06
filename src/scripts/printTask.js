import { getLocal, updateLocal } from './localStorage.js';
import { getElement, createElement } from './queries.js';
import newIndex from './updateIndex.js';

function deleteTask(task, tasks) {
  const local = getLocal();
  if (local) {
    tasks = local;
    tasks = newIndex(tasks);
  }
  const objIndex = tasks.findIndex((obj) => obj.index === task.index);
  tasks.splice(objIndex, 1);
  newIndex(tasks);
  window.location.reload();
}

function editTask(menu, description, tasks, task) {
  const local = getLocal();
  if (local) {
    tasks = local;
    tasks = newIndex(tasks);
  }
  const objIndex = tasks.findIndex((obj) => obj.index === task.index);
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

function changeStatus(done, tasks, task) {
  const local = getLocal();
  if (local) {
    tasks = local;
    tasks = newIndex(tasks);
  }
  const objIndex = tasks.findIndex((obj) => obj.index === task.index);
  if (done.checked) {
    tasks[objIndex].completed = true;
    updateLocal(tasks);
  } else {
    tasks[objIndex].completed = false;
    updateLocal(tasks);
  }
}

function printTask(task, tasks) {
  const li = createElement('li');
  const done = createElement('input');
  done.type = 'checkbox';
  done.checked = task.completed;
  if (task.completed) li.classList.add('completed');
  done.addEventListener('change', () => {
    li.classList.toggle('completed');
    changeStatus(done, tasks, task);
  });
  const description = createElement('span');
  description.innerHTML = task.description;
  description.className = 'task-text';
  const menu = createElement('span');
  menu.innerHTML = '⋮';
  menu.className = 'task-options';
  menu.addEventListener('click', () => {
    editTask(menu, description, tasks, task);
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