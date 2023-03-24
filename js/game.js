const startNewGame = () => {
  if(!players[0].name || !players[1].name){
    alert('please set custom player names for both players!');
    return;
  }
  activePlayerNameElement.textContent =  players[activePlayer].name;
  gameAreaElement.style.display = 'block';
}

const selectGameField = (event) => {

  if(event.target.tagName !== 'LI'){
    return;
  }

  if(gameData[selectionRow][selectionColumn] > 0){
    alert('Please select an empty field!')
    return;
  }

  const selectedField = event.target;
  const selectionColumn = selectedField.dataset.col-1;
  const selectionRow = selectedField.dataset.row-1;

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add('disabled');


  gameData[selectionRow][selectionColumn] = activePlayer + 1;

  switchPlayer();
}

const switchPlayer = () => {
  if(activePlayer === 0){
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent =  players[activePlayer].name;  
}