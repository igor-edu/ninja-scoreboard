const data = {
  players: [
    {
      name: 'Yoshi',
      motto: 'fight till death',
      score: 0,
      playerId: 1,
      imgSrc: 'img/yoshi.svg',
    },
    {
      name: 'Tao',
      motto: 'love is all around but rarely within',
      score: 0,
      playerId: 2,
      imgSrc: 'img/tao.svg',
    },
    {
      name: 'Ninja',
      motto: 'dying is easy, living is difficult',
      score: 0,
      playerId: 3,
      imgSrc: 'img/ninja.svg',
    },
    {
      name: 'Leo',
      motto: 'spreading fear and greed',
      score: 0,
      playerId: 4,
      imgSrc: 'img/leo.svg',
    },
    {
      name: 'Ronin',
      motto: 'alone but not lonely',
      score: 0,
      playerId: 5,
      imgSrc: 'img/ronin.svg',
    },
  ],

  nextPlayerId: 6,

  findPlayer(playerId) {
    return this.players.find((player) => player.playerId === playerId);
  },

  findPlayerByName(playerName) {
    return this.players.find((player) => player.name === playerName);
  },

  addPlayer(newPlayer) {
    this.players = [...this.players, newPlayer];
  },

  editPlayer(oldPlayer, newPlayer) {
    this.players = this.players.map((player) =>
      player === oldPlayer ? newPlayer : player
    );
  },

  deletePlayer(playerId) {
    this.players = this.players.filter(
      (player) => player.playerId !== playerId
    );
  },

  changePlayerScore(playerId, points) {
    this.findPlayer(playerId).score += points;
  },

  resetScores() {
    this.players.forEach(function (player) {
      player.score = 0;
    });
  },

  maxScore() {
    return Math.max(...this.players.map((player) => player.score));
  },

  leadPlayers() {
    const maxScore = this.maxScore();
    if (maxScore <= 0) return 'none';
    return this.players
      .filter((player) => player.score === maxScore)
      .map((player) => player.name)
      .join(', ');
  },

  totalPoints() {
    return this.players.reduce((acc, player) => player.score + acc, 0);
  },

  sortMethod: 'age',

  sortPlayers(method) {
    switch (method) {
      case 'name':
        this.players.sort((a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
        );
        break;
      case 'age':
        this.players.sort((a, b) => a.playerId - b.playerId);
        break;
      case 'score':
        this.players.sort((a, b) => b.score - a.score);
        break;
    }
  },

  playersListHtml() {
    this.sortPlayers(this.sortMethod);
    return this.players.reduce(function (acc, player) {
      const html = `            
        <div class="player grid" data-player-id="${player.playerId}">
            <button class="delete-player-button" data-action="delete-player">x</button>
            <button class="edit-player-button" data-action="edit-player">&#9998;</button>
            <span class="star-picture flex">&#10030;</span>
            <div class="player-image-container flex"><img class="player-image" src="${player.imgSrc}" alt="player image"/></div>
            <div class="player-name"><h3>${player.name}</h3><p>${player.motto}</p></div>
            <button class="change-player-score decrease-player-score" data-action="decrease-player-score">-</button>
            <span class="player-score flex">${player.score}</span>
            <button class="change-player-score increase-player-score" data-action="increase-player-score">+</button>
        </div>`;
      return acc + html;
    }, '');
  },
};
