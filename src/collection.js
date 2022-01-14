const listWraper = document.querySelector('.li-wraper');

export default class Collection {
  constructor(list = []) {
    this.list = list;
  }

  add(data) {
    if (this.list.filter((item) => item.desc === data.desc).length > 0) {
      return;
    }
    this.list.push(data);
    this.display(data);
    this.arrange();
    this.remove();
    this.edit();
    this.complete();
    this.populateStorage();
  }

  display(data) {
    if (this) {
      const actualTask = document.createElement('li');
      actualTask.className = 'task';
      if (data.completed) {
        actualTask.innerHTML = `
      <div class="task-left">
      <input class="check" type="checkbox" name="${data.desc}" id="${data.desc}" CHECKED>
      <p class="task-desc checked" contenteditable>${data.desc}</p></div>
      <box-icon class="box-icon rmvBtn trash displaynt" name='trash'></box-icon>
      <box-icon class="box.icon dots" name='dots-vertical-rounded' ></box-icon>`;
      } else {
        actualTask.innerHTML = `
        <div class="task-left">
        <input class="check" type="checkbox" name="${data.desc}" id="${data.desc}">
        <p class="task-desc" contenteditable>${data.desc}</p></div>
        <box-icon class="box-icon rmvBtn trash displaynt" name='trash'></box-icon>
        <box-icon class="box.icon dots" name='dots-vertical-rounded' ></box-icon>`;
      }
      listWraper.appendChild(actualTask);
    }
  }

  arrange() {
    const rmvBtns = document.querySelectorAll('.rmvBtn');
    for (let i = 0; i < rmvBtns.length; i += 1) {
      this.list[i].index = i;
      rmvBtns[i].setAttribute('data-value', i);
    }
  }

  remove() {
    const rmvBtns = document.querySelectorAll('.rmvBtn');
    rmvBtns[rmvBtns.length - 1].addEventListener('click', (e) => {
      this.removeTask(e.target);
      listWraper.removeChild(e.target.parentNode);
      this.arrange();
      this.populateStorage();
    });
  }

  removeTask(node) {
    const removeIndex = parseInt(node.getAttribute('data-value'), 10);
    this.list = this.list.filter((item) => removeIndex !== item.index);
  }

  edit() {
    const editable = document.querySelectorAll('.task-desc');
    editable[editable.length - 1].addEventListener('focus', (e) => {
      const index = e.target.parentNode.nextSibling.nextSibling.getAttribute('data-value');
      const trashBtn = document.getElementsByClassName('trash');
      const dotsBtn = document.getElementsByClassName('dots');
      trashBtn[index].classList.remove('displaynt');
      dotsBtn[index].classList.add('displaynt');
    });
    editable[editable.length - 1].addEventListener('blur', (e) => {
      const index = e.target.parentNode.nextSibling.nextSibling.getAttribute('data-value');
      const trashBtn = document.getElementsByClassName('trash');
      const dotsBtn = document.getElementsByClassName('dots');
      setTimeout(() => {
        if (trashBtn[index] && dotsBtn[index]) {
          trashBtn[index].classList.add('displaynt');
          dotsBtn[index].classList.remove('displaynt');
        }
      }, 90);
    });

    editable[editable.length - 1].addEventListener('input', (e) => {
      const index = e.target.parentNode.nextSibling.nextSibling.getAttribute('data-value');
      this.list[index].desc = e.target.textContent;
      this.populateStorage();
    });
  }

  populateStorage() {
    localStorage.setItem(
      'tasksList',
      JSON.stringify({
        tasksList: this.list,
      }),
    );
  }

  complete() {
    const checker = document.querySelectorAll('.check');
    checker[checker.length - 1].addEventListener('change', (e) => {
      e.target.parentNode.children[1].classList.toggle('checked');
      const index = e.target.parentNode.parentNode.children[1].getAttribute('data-value');
      this.list[index].completed = !this.list[index].completed;
      this.populateStorage();
    });
  }
}