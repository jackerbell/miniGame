const openPlayerConfig = (event) => {
  editedPlayer = +event.target.dataset.playerid; // event 대상은 두 버튼 중 하나 > button 마다 data- 속성이 있어 구분가능.
  playerConfigOverlayElement.style.display = 'block';
  backdropElement.style.display = 'block';
}

const closePlayerConfig = () => {
  playerConfigOverlayElement.style.display = 'none';
  backdropElement.style.display = 'none';
  formElement.firstElementChild.classList.remove('error'); // 다시 edit 시 초기화(오류 표시가 사라져있어야 함)
  errorsOutputElement.textContent='';
}

const savePlayerConfig = (event) => {
  event.preventDefault(); // 설정하지 않으면 화면이 강제로 reload되어 이전 데이터가 모두 날아가버림;;
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get('playername').trim();

  if(!enteredPlayerName) {
    event.target.firstElementChild.classList.add('error');
    errorsOutputElement.textContent = 'Please Enter a valid name';
    return;
  }

  const updatedPlayerDataElement = document.getElementById('player-'+editedPlayer+'-data');
  updatedPlayerDataElement.children[1].textContent = enteredPlayerName;

  players[editedPlayer - 1].name = enteredPlayerName; 
  closePlayerConfig();
}