const tiles = ['cross-1', 'cross-1', 'cross-2', 'cross-2', 'ex-1', 'ex-1', 'ex-2', 'ex-2', 'circle-1', 'circle-1', 'circle-2' ,'circle-2', 'square-1', 'square-1', 'square-2', 'square-2'];
const selectedTiles = [];
let tilesCount = tiles.length;
let boardSize = Math.sqrt(tilesCount);
let tilesGuessed = 0;
let playerClicks = 0;
const allTiles = document.getElementsByClassName('tile');


// create an array and fill it with randomized $tile values
function createBoardArray(size) {
  let arr = [];

  for(let i = 0; i < size; i++){

    arr.push([]);
    arr[i].push( new Array(size));

    for(let j = 0; j < size; j++){
      let randomTileIndex = Math.floor(Math.random() * tiles.length);
      arr[i][j] = tiles[randomTileIndex];
      tiles.splice(randomTileIndex, 1);
    }

  }
  return arr;
}

// create DOM for the board
function createBoardDOM(myBoard) {
  let i = 0;
  let boardSize = myBoard.length;

  for (let y = 0; y < boardSize ; y++) {
    for (let x = 0; x < boardSize ; x++) {
      let myClasses = ['tile', 'tile-' + myBoard[x][y]];
      createBoardNode('div', myClasses, myBoard[x][y], i);
      i++;
    }
  }
}

// create DOM node
function createBoardNode(nodeType, myClasses, value, id) {
  let i = 0;
  let node = document.createElement(nodeType);

  for (i = 0; i < myClasses.length; i++) node.classList.add(myClasses[i]);
  node.dataset.id = id;
  node.dataset.value = value;
  // node.innerHTML = value;
  document.getElementById("board").appendChild(node);
}


function selectedTileAdd(tile) {
  tile.classList.add('marked');
  selectedTiles.push(tile);
  if (selectedTiles.length === 1) hideTilesExcept(tile);
  console.log("adding " + tile.dataset.value);
}


// compare two selected tiles
function selectedTilesCompare() {
  let success = false;
  console.log("comparing " + selectedTiles[0].dataset.value + " + " + selectedTiles[1].dataset.value);
  if (selectedTiles[0].dataset.value === selectedTiles[1].dataset.value) success = true;

  if (success) {
    console.log("success!")
    tilesGuessed += 2;
    console.log(tilesGuessed);
    return true;
  } else {
    console.log("different");
    return false;
  }
}

// remove values from array of selected tiles
function selectedTilesReset() {
  selectedTiles.pop();
  selectedTiles.pop();
}


function tileClicked() {
  let tile = event.target;
  if (selectedTiles.length <2) selectedTileAdd(tile);
  if (selectedTiles.length == 2) {
    if (selectedTilesCompare()) markGuessed();
    selectedTilesReset();
  }
  playerClicks++;
  setClassValue('tries', playerClicks);
  if (tilesGuessed === tilesCount) alert('Final score: ' + playerClicks);
}


function addListener() {
  let listenerObject = document.getElementsByClassName('board');
  listenerObject[0].addEventListener('click', tileClicked);
}


function hideTilesExcept(tiles) {
  for (let i = 0; i < allTiles.length; i++) {
    allTiles[i].classList.remove('marked');
  }
  tiles.classList.add('marked');
}


markGuessed= () => { for(let i = 0; i < 2; i++) selectedTiles[i].classList.add('guessed'); }

getTileID = (tiles) => tiles.dataset.id;

getTileValue = (tiles) => tiles.dataset.value;

getClassValue = (myClass) => document.getElementsByClassName(myClass)[0].innerHTML;

setClassValue = (myClass, value) => document.getElementsByClassName(myClass)[0].innerHTML = value;

console.log("ver 0.1");
createBoardDOM(createBoardArray(boardSize));
addListener();
