import './style.css';
import 'boxicons';
import Task from './task.js';
import Collection from './collection.js';

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

const listWraper = document.querySelector('.li-wraper');

const clearBtn = document.querySelector('.list-btn');

clearBtn.addEventListener('click', () => {
  const indexes = [];
  coll.list.forEach(item => {
    if(item.completed){
      indexes.push(item.index)
    }
  })
  for(let i = indexes.length -1 ; i >= 0; i -= 1){
    if(listWraper.children[indexes[i]].children[1]){
      listWraper.children[indexes[i]].children[1].click();
    }
  }
  coll.populateStorage();
})

const refresh = document.querySelector('.refresh').addEventListener('click', () => {
  coll.clear
})
