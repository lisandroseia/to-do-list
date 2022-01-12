import './style.css';
import 'boxicons';

const listWraper = document.querySelector('.li-wraper');
const input = document.querySelector('.input-task');

class task{
  constructor(index, desc, completed){
    this.index = index;
    this.desc = desc;
    this.completed = false;
  }
}

class Collection{
  constructor(list = []){
    this.list = list;
  }

  add(data){
    if(this.list.filter(item => item.desc === data.desc).length > 0){
      return
    }

    this.list.push(data);
    this.display(data)
    this.remove()
    this.changeContent()
  }
  
  display(data){
    if(this){
      const actualTask = document.createElement('li');
      actualTask.className = 'task';
      actualTask.innerHTML = `
    <div class="task-left">
    <input type="checkbox" name="${data.desc}" id="${data.desc}">
    <p class="task-desc" contenteditable>${data.desc}</p></div>
    <box-icon data-value="${data.index}" class="box-icon rmvBtn" name='dots-vertical-rounded'></box-icon>`;
    listWraper.appendChild(actualTask);
    }
  }

  remove(){
    const rmvBtns = document.querySelectorAll('.rmvBtn');
    rmvBtns[rmvBtns.length - 1].addEventListener('click', (e) => {
      console.log(e.target)
    this.removeTask(e.target);
    listWraper.removeChild(e.target.parentNode);
    })
  }

  removeTask(data){
    const toRemove = parseInt(data.getAttribute('data-value'));
    this.list = this.list.filter(item => item.index !== toRemove);
    let counter = 0;
    for(let i = 0; i < this.list.length; i++){
      data.setAttribute('data-value', i);
      this.list[i].index = counter;
      counter++;
    }
  }

  changeContent(){
    const editables = document.querySelectorAll('.task-desc');
    editables[editables.length -1].addEventListener('input', (e) => {
      console.log(e.target.parentNode);
    })
  }

}

const coll = new Collection;

window.addEventListener('keydown', (e) => {
  if(e.keyCode === 13 && input.value !== ''){
    coll.add(new task(coll.list.length,input.value))
    console.log(coll.list)
    input.value = '';
  }
})