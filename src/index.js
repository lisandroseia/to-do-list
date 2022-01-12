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
    this.display(data);
    this.arrange();
    this.remove();
    this.edit();
    console.log(JSON.stringify(this.list));
  }
  
  display(data){
    if(this){
      const actualTask = document.createElement('li');
      actualTask.className = 'task';
      actualTask.innerHTML = `
    <div class="task-left">
    <input type="checkbox" name="${data.desc}" id="${data.desc}">
    <p class="task-desc" contenteditable>${data.desc}</p></div>
    <box-icon class="box-icon rmvBtn" name='dots-vertical-rounded'></box-icon>`;
    listWraper.appendChild(actualTask);
    }
  }

  arrange(){
     const rmvBtns = document.querySelectorAll('.rmvBtn');
     let counter = 0;
     for(let i = 0 ; i < rmvBtns.length; i++){
       this.list[i].index = i;
       rmvBtns[i].setAttribute('data-value', i)
     }
    }

    remove(){
      const rmvBtns = document.querySelectorAll('.rmvBtn');
      rmvBtns[rmvBtns.length - 1].addEventListener('click', (e) => {
        this.removeTask(e.target);
        listWraper.removeChild(e.target.parentNode)
        this.arrange();
      })
    }

    removeTask(node){
        const removeIndex  = parseInt(node.getAttribute('data-value'));
        this.list = this.list.filter(item => removeIndex !== item.index);
    }

    edit(){
      const editable = document.querySelectorAll('.task-desc');
      editable[editable.length - 1].addEventListener('input', (e) => {
        const index = e.target.parentNode.nextSibling.nextSibling.getAttribute('data-value');
        this.list[index].desc = e.target.textContent;
        console.log(JSON.stringify(this.list))
      })
    }
}

const coll = new Collection;

window.addEventListener('keydown', (e) => {
  if(e.keyCode === 13 && input.value !== ''){
    coll.add(new task(coll.list.length,input.value))
    input.value = '';
  }
})
