const resetGameStatus = () => {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML = 'You won <span id="winner-name">Player Name</span>!';
  gameOverElement.style.display = 'none'

  let gameBoardIndex = 0;
  for(let i = 0; i<3; i++){
    for(let j =0; j < 3; j++){
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex]; 
      gameBoardItemElement.textContent = '';
      gameBoardItemElement.classList.remove('disabled');
      gameBoardIndex++;
    }
  }
}

const startNewGame = () => {
  if(!players[0].name || !players[1].name){
    alert('please set custom player names for both players!');
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent =  players[activePlayer].name;
  gameAreaElement.style.display = 'block';
}

const selectGameField = (event) => {
  
  const selectedField = event.target;
  const selectionColumn = selectedField.dataset.col-1;
  const selectionRow = selectedField.dataset.row-1;
  
  if(event.target.tagName !== 'LI' || gameIsOver === true){
    return;
  }

  if(gameData[selectionRow][selectionColumn] > 0){
    alert('Please select an empty field!')
    return;
  }


  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add('disabled');


  gameData[selectionRow][selectionColumn] = activePlayer + 1;

  const winnerId = checkForGameOver();
  
  if(winnerId !== 0 ){
    endGame(winnerId);
  }

  currentRound++;
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

const checkForGameOver = () => {
  // case1 똑같은 행에서의 비교
  for(let i=0; i<3; i++){
    if(gameData[i][0] > 0 && 
      gameData[i][0] ===  gameData[i][1] && 
      gameData[i][1] === gameData[i][2]) {
      return gameData[i][0];
    }
  }

  // case2 같은 열에서의 비교
  for(let i=0; i<3; i++){
    if(gameData[0][i] > 0 && 
      gameData[0][i] ===  gameData[1][i] && 
      gameData[1][i] === gameData[2][i]) {
      return gameData[0][i];
    }
  }

  // case3 좌측 상단 → 우측 하단
  if(gameData[0][0] > 0 && 
    gameData[0][0] ===  gameData[1][1] && 
    gameData[1][1] === gameData[2][0]) {
    return gameData[0][0];
  }

  // case4 좌측 하단 → 우측 상단
  if(gameData[2][0] > 0 && 
    gameData[2][0] ===  gameData[1][1] && 
    gameData[1][1] === gameData[0][2]) {
    return gameData[2][0];
  }

  if(currentRound === 9){
    return -1;
  }

  return 0;



}

const endGame = (winnerId) => {
  gameIsOver = true;
  gameOverElement.style.display = 'block';

  if(winnerId > 0){
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = 'it\'s a draw !' 
  }

}