import './style.css';
import 'boxicons';

const tasks = [
  {
    description: 'set webpack',
    completed: false,
    index: 0,
  },
  {
    description: 'display items',
    completed: false,
    index: 2,
  },
  {
    description: 'request review',
    completed: false,
    index: 2,
  },
];

const listWraper = document.querySelector('.li-wraper');

for (let i = 0; i < tasks.length; i += 1) {
  const actualTask = document.createElement('li');
  actualTask.className = 'task';

  actualTask.innerHTML = `
    <div class="task-left">
    <input type="checkbox" name="${tasks[i].description}" id="${tasks[i].description}">
    <p>${tasks[i].description}</p></div>

                        <box-icon class="box-icon" name='dots-vertical-rounded'></box-icon>
                          `;
  listWraper.appendChild(actualTask);
}
