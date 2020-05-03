const tiles = ['a', 'a', 'b', 'b', 'c', 'c', 'd', 'd', 'e', 'e', 'f' ,'f', 'g', 'g', 'h', 'h'];
const selectedTiles = [];
let tilesCount = tiles.length;
let tilesDiscovered = 0;
let tilePrevious = null;
let playerClicks = 0;


// create an array and fill it with randomized $tile values
function createBoardArray(rows, cols) {
  let arr = [];

  for(let i = 0; i < rows; i++){

    arr.push([]);
    arr[i].push( new Array(cols));

    for(let j = 0; j < cols; j++){
      let randomTileIndex = Math.floor(Math.random() * tiles.length);
      arr[i][j] = tiles[randomTileIndex];
      tiles.splice(randomTileIndex, 1);
      console.log(randomTileIndex);
    }
  }
  return arr;
}

// create DOM for the board
function createBoardDOM(myBoard) {
  let x = 0;
  let y = 0;
  let i = 0;
  let boardSize = myBoard.length;

  for (y = 0; y < boardSize ; y++) {
    for (x = 0; x < boardSize ; x++) {
      let myClasses = ['tile', 'tile-' + myBoard[x][y]];
      createBoardNode('a', myClasses, myBoard[x][y], i);
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
  node.text = value;
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
    tilesDiscovered += 2;
    console.log(tilesDiscovered);
    return true;
  } else {
    console.log("different");
    return false;
  }

}

// remove values from array of selected tiles
function selectedTilesReset() {
  console.log("zeroing");
  selectedTiles.pop();
  selectedTiles.pop();
}


function tileClicked() {
  let tile = event.target;

  if (selectedTiles.length <2) selectedTileAdd(tile);
  if (selectedTiles.length == 2) {
    if (selectedTilesCompare()) markDiscovered();
    selectedTilesReset();
  }
  playerClicks++;
  console.log(setClassValue('tries', playerClicks));
  if (tilesDiscovered === tilesCount) alert('Final score: ' + playerClicks);
}



function addListeners() {
  let myField = document.getElementsByClassName('tile');
  for (let i = 0; i < myField.length; i++) {
    myField[i].addEventListener('click', tileClicked);
  }
}


function hideTilesExcept(tiles) {
  let myField = document.getElementsByClassName('tile');
  for (let i = 0; i < myField.length; i++) {
    myField[i].classList.remove('marked');
  }
  tiles.classList.add('marked');
}


markDiscovered = () => { for(let i=0; i < 2; i++) selectedTiles[i].classList.add('uncovered'); }

getTileID = (tiles) => tiles.dataset.id;

getTileValue = (tiles) => tiles.dataset.value;

getClassValue = (myClass) => document.getElementsByClassName(myClass)[0].innerHTML;

setClassValue = (myClass, value) => document.getElementsByClassName(myClass)[0].innerHTML = value;


createBoardDOM(createBoardArray(4,4));
addListeners();
