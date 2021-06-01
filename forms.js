'use strict';

function openEditPlayerModal(player) {
  const modal = editPlayerModal,
    form = modal.querySelector('form'),
    h2 = modal.querySelector('h2');

  resetForm(form);

  if (player) {
    h2.textContent = `Edit details for existing player ${player.name}`;
  } else {
    h2.textContent = 'Enter details for a new player';
  }

  form['edit-player-form-name'].value = player ? player.name : '';
  form['edit-player-form-motto'].value = player ? player.motto : '';
  form['edit-player-form-score'].value = player ? player.score : '';
  form['edit-player-form-imgsrc'].value = player ? player.imgSrc : '';

  form.player = player;
  modal.style.display = 'flex';
}

// --------------------------------------------------------------------------- general functions
function resetForm(form) {
  findInputs(form).forEach((input) => {
    markInput(input, originalLabelText(input), false);
  });

  form.reset();
}

function checkForm(form) {
  return findInputs(form).every((input) => checkInput(input));
}

function findInputs(form) {
  return Array.from(form.querySelectorAll('input'));
}

function markInput(input, text, paintRed) {
  const label = findLabel(input);
  label.textContent = text;

  if (paintRed) {
    label.style.color = 'red';
    input.style.border = '2px solid red';
  } else {
    label.style.color = '';
    input.style.border = '';
  }
}

function findLabel(input) {
  return input.closest('form').querySelector(`label[for="${input.id}"]`);
}

function originalLabelText(input) {
  switch (input.id) {
    case 'edit-player-form-name':
      return 'Enter Player Name';
    case 'edit-player-form-motto':
      return 'Enter Player Motto';
    case 'edit-player-form-score':
      return 'Enter Player Score';
    case 'edit-player-form-imgsrc':
      return 'Enter Player Image Url';
  }
}

/* ------------------------------------------------------------------------------------------------ update view */
function updateView(data) {
  updateStats(data);
  updatePlayers(data);
  updateStars(data);
}

function updateStats(data) {
  totalPoints.textContent = data.totalPoints();
  maxScore.textContent = data.maxScore();
  leadPlayer.textContent = data.leadPlayers();
  sortMethod.textContent = data.sortMethod;
}

function updatePlayers(data) {
  players.innerHTML = data.playersListHtml();
}

function updateStars(data) {
  const maxScore = data.maxScore();

  data.players.forEach(function (player) {
    const playerUI = document.querySelector(
      `.player[data-player-id="${player.playerId}"]`
    );
    const playerStar = playerUI.querySelector('.star-picture');
    if (player.score === maxScore && maxScore > 0) {
      playerStar.classList.add('lead-star');
    } else {
      playerStar.classList.remove('lead-star');
    }
  });
} /*  end of update view */
