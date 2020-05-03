const items = ['a', 'a', 'b', 'b', 'c', 'c', 'd', 'd', 'e', 'e', 'f' ,'f', 'g', 'g', 'h', 'h'];
const tilesMatchRatio = 2;
const selectedItems = [];
let previousItem = null;

function createBoardArray(rows, cols) {
  let arr = [];

  for(let i=0; i < rows; i++){

    arr.push([]);
    arr[i].push( new Array(cols));

    for(let j=0; j < cols; j++){
      let randomItemIndex = Math.floor(Math.random() * items.length);
      arr[i][j] = items[randomItemIndex];
      items.splice(randomItemIndex, 1);
    }
  }

  return arr;
}

function selectedItemAdd(item) {
  item.classList.add('marked');
  selectedItems.push(item);
  if (selectedItems.length === 1) hideItemsExcept(item);
  console.log("adding " + item.dataset.value);
}

function selectedItemsCompare() {
  let success = false;
  console.log("comparing " + selectedItems[0].dataset.value + " + " + selectedItems[1].dataset.value);
  if (selectedItems[0].dataset.value === selectedItems[1].dataset.value) success = true;

  if (success) {
    console.log("success!")
    return true;
  } else {
    console.log("different");
    return false;
  }

}

function selectedItemsReset() {
  console.log("zeroing");
  selectedItems.pop();
  selectedItems.pop();
}

function createBoardDOM(myBoard) {
  let x = 0;
  let y = 0;
  let i = 0;
  let boardSize = myBoard.length;

  for (y = 0; y < boardSize ; y++) {
    for (x = 0; x < boardSize ; x++) {
      let myClasses = ['field', 'field-' + myBoard[x][y]];
      createBoardNode('a', myClasses, myBoard[x][y], i);
      i++;
    }
  }
}


function createBoardNode(nodeType, myClasses, value, id) {
  let i = 0;
  let node = document.createElement(nodeType);

  for (i = 0; i < myClasses.length; i++) node.classList.add(myClasses[i]);
  node.dataset.id = id;
  node.dataset.value = value;
  node.text = value;
  document.getElementById("board").appendChild(node);
}

function itemClicked() {
  let item = event.target;

  if (selectedItems.length <2) selectedItemAdd(item);
  if (selectedItems.length == 2) {
    if (selectedItemsCompare()) markDiscovered();
    selectedItemsReset();
  }
}



function addListeners() {
  var myField = document.getElementsByClassName('field');
  for (var i = 0; i < myField.length; i++) {
    myField[i].addEventListener('click', itemClicked);
  }
}


function hideItemsExcept(item) {
  var myField = document.getElementsByClassName('field');
  for (var i = 0; i < myField.length; i++) {
    myField[i].classList.remove('marked');
  }
  item.classList.add('marked');
}


function markDiscovered() {
  selectedItems[0].classList.add('hidden');
  selectedItems[1].classList.add('hidden');
}

function nothing() {

}


getItemID = (item) => item.dataset.id;

getItemValue = (item) => item.dataset.value;




createBoardDOM(createBoardArray(4,4));
addListeners();
