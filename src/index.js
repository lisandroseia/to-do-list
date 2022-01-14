import './style.css';
import 'boxicons';
import Task from './task.js';
import Collection from './collection.js';

import clear from './clear.js';

const input = document.querySelector('.input-task');
const coll = new Collection();

if (localStorage.getItem('tasksList')) {
  const previousTasks = JSON.parse(localStorage.getItem('tasksList')).tasksList;
  for (let i = 0; i < previousTasks.length; i += 1) {
    coll.add(new Task(previousTasks[i].index, previousTasks[i].desc, previousTasks[i].completed));
  }
}

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 13 && input.value !== '') {
    coll.add(new Task(coll.list.length, input.value, false));
    input.value = '';
  }
});

const clearBtn = document.querySelector('.list-btn');

clearBtn.addEventListener('click', () => {
  clear(coll);
  coll.populateStorage();
});
