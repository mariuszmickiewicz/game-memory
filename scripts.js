const tiles = ['a', 'a', 'b', 'b', 'c', 'c', 'd', 'd', 'e', 'e', 'f' ,'f', 'g', 'g', 'h', 'h'];
let tilesCount = tiles.length;
console.log("tiles: " + tilesCount);
const selectedTiles = [];
let tilesDiscovered = 0;
let previousTile = null;

function createBoardArray(rows, cols) {
  let arr = [];

  for(let i=0; i < rows; i++){

    arr.push([]);
    arr[i].push( new Array(cols));

    for(let j=0; j < cols; j++){
      let randomTileIndex = Math.floor(Math.random() * tiles.length);
      arr[i][j] = tiles[randomTileIndex];
      tiles.splice(randomTileIndex, 1);
      console.log(randomTileIndex);
    }
  }

  return arr;
}

function selectedTileAdd(tiles) {
  tiles.classList.add('marked');
  selectedTiles.push(tiles);
  if (selectedTiles.length === 1) hideTilesExcept(tiles);
  console.log("adding " + tiles.dataset.value);
}

function selectedTilesCompare() {
  let success = false;
  console.log("comparing " + selectedTiles[0].dataset.value + " + " + selectedTiles[1].dataset.value);
  if (selectedTiles[0].dataset.value === selectedTiles[1].dataset.value) success = true;

  if (success) {
    console.log("success!")
    tilesDiscovered += 2;
    console.log(tilesDiscovered);
    return true;
  } else {
    console.log("different");
    return false;
  }

}

function selectedTilesReset() {
  console.log("zeroing");
  selectedTiles.pop();
  selectedTiles.pop();
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

function tilesClicked() {
  let tiles = event.target;

  if (selectedTiles.length <2) selectedTileAdd(tiles);
  if (selectedTiles.length == 2) {
    if (selectedTilesCompare()) markDiscovered();
    selectedTilesReset();
  }
  if (tilesDiscovered === tilesCount) alert('You have won!');
}



function addListeners() {
  var myField = document.getElementsByClassName('field');
  for (var i = 0; i < myField.length; i++) {
    myField[i].addEventListener('click', tilesClicked);
  }
}


function hideTilesExcept(tiles) {
  var myField = document.getElementsByClassName('field');
  for (var i = 0; i < myField.length; i++) {
    myField[i].classList.remove('marked');
  }
  tiles.classList.add('marked');
}


function markDiscovered() {
  selectedTiles[0].classList.add('hidden');
  selectedTiles[1].classList.add('hidden');
}

function nothing() {

}


getTileID = (tiles) => tiles.dataset.id;

getTileValue = (tiles) => tiles.dataset.value;




createBoardDOM(createBoardArray(4,4));
addListeners();
