'use strict';

const players = document.getElementById('players'),
  totalPoints = document.getElementById('total-points'),
  maxScore = document.getElementById('max-score'),
  leadPlayer = document.getElementById('lead-player'),
  sortMethod = document.getElementById('sort-method'),
  resetScoresModal = document.getElementById('reset-scores-modal'),
  editPlayerModal = document.getElementById('edit-player-modal'),
  editPlayerForm = document.getElementById('edit-player-form'),
  deletePlayerModal = document.getElementById('delete-player-modal'),
  sortPlayersModal = document.getElementById('sort-players-modal');

updateView(data);

/* ------------------------------------------------------------------ add event listener for all buttons */
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal-window')) {
    e.target.style.display = 'none';
    return;
  }

  if (e.target.tagName !== 'BUTTON') return;

  const playerView = e.target.closest('.player'),
    playerId = playerView ? +playerView.dataset.playerId : 0,
    player = data.findPlayer(playerId),
    action = e.target.dataset.action;

  switch (action) {
    case 'delete-player':
      const modal = deletePlayerModal,
        text = `Are you sure that you want to delete ${player.name}?`;
      modal.player = player;
      modal.querySelector('h2').textContent = text;
      modal.style.display = 'flex';
      break;

    case 'confirm-delete-player':
      data.deletePlayer(deletePlayerModal.player.playerId);
      deletePlayerModal.style.display = 'none';
      break;

    case 'cancel-delete-player':
    case 'cancel-edit-player':
    case 'cancel-reset-scores':
    case 'cancel-sort-players':
      e.target.closest('.modal-window').style.display = 'none';
      break;

    case 'edit-player':
      openEditPlayerModal(player);
      break;

    case 'confirm-edit-player':
      processPlayer(data, editPlayerForm);
      break;

    case 'decrease-player-score':
      data.changePlayerScore(playerId, -1);
      break;

    case 'increase-player-score':
      data.changePlayerScore(playerId, 1);
      break;

    case 'add-player':
      openEditPlayerModal();
      break;

    case 'sort-players':
      sortPlayersModal.style.display = 'flex';
      break;

    case 'sort-players-name':
    case 'sort-players-age':
    case 'sort-players-score':
      const sortMethod = action.split('-').slice(-1)[0];
      data.sortMethod = sortMethod;
      sortPlayersModal.style.display = 'none';
      break;

    case 'sort-players':
      sortPlayersModal.style.display = 'flex';
      break;

    case 'sort-players':
      sortPlayersModal.style.display = 'flex';
      break;

    case 'reset-scores':
      resetScoresModal.style.display = 'flex';
      break;

    case 'confirm-reset-scores':
      data.resetScores();
      resetScoresModal.style.display = 'none';
      break;
  }

  updateView(data);
}); /* end of add event listener for all buttons on the page */

/* ------------------------------------------------------------------ process add new or edit existing player */
function processPlayer(data, form) {
  if (form.player) {
    editExistingPlayer(data, form);
  } else {
    addNewPlayer(data, form);
  }
}

function addNewPlayer(data, form) {
  if (checkForm(form)) {
    data.addPlayer(makeNewPlayer(form));
    editPlayerModal.style.display = 'none';
  }
}

function editExistingPlayer(data, form) {
  if (checkForm(form)) {
    const oldPlayer = data.findPlayer(form.player.playerId);
    data.editPlayer(oldPlayer, makeNewPlayer(form));
    editPlayerModal.style.display = 'none';
  }
}

function makeNewPlayer(form) {
  return {
    name: form['edit-player-form-name'].value.trim(),
    motto: form['edit-player-form-motto'].value.trim(),
    score: +form['edit-player-form-score'].value,
    playerId: form.player ? form.player.playerId : data.nextPlayerId++,
    imgSrc: form['edit-player-form-imgsrc'].value.trim() || 'img/user-icon.png',
  };
} /* end of add new or edit existing player */

/* ------------------------------------------------------------------------------------------------ add event listeners for inputs on change */
findInputs(editPlayerForm).forEach((input) => {
  input.addEventListener('input', checkInputOnChange);
});

function checkInputOnChange(e) {
  checkInput(e.target);
}

function checkInput(input) {
  const lastWord = input.id.split('-').slice(-1)[0],
    value = input.value.trim(),
    player = editPlayerForm.player;

  if (lastWord === 'imgsrc') return true;

  if (value === '') {
    markInput(input, `Player should have some ${lastWord}`, true);
    return false;
  }

  switch (input.id) {
    case 'edit-player-form-name':
      if (player && value === player.name) {
        markInput(input, 'Edit Player Name', false);
        return true;
      }

      if (data.findPlayerByName(value)) {
        const text = `Player name should be unique, player ${value} already exists`;
        markInput(input, text, true);
        return false;
      } else {
        markInput(input, `Enter Player Name`, false);
        return true;
      }

    case 'edit-player-form-motto':
      markInput(input, `Enter Player Motto`, false);
      return true;

    case 'edit-player-form-score':
      if (!Number.isInteger(+value)) {
        markInput(input, 'Player score should be an integer', true);
        return false;
      } else {
        markInput(input, `Enter Player Score`, false);
        return true;
      }
  }
} /* end of add event listeners for inputs on change */
