const listWraper = document.querySelector('.li-wraper');

export default function clear(list) {
  const indexes = [];
  list.list.forEach((item) => {
    if (item.completed) {
      indexes.push(item.index);
    }
  });
  for (let i = indexes.length - 1; i >= 0; i -= 1) {
    if (listWraper.children[indexes[i]].children[1]) {
      listWraper.children[indexes[i]].children[1].click();
    }
  }
}