/* eslint-disable no-console */
export const state = () => ({
  games: [],
  timer: 60,
});

export const mutations = {
  setGames(state) {
    if (process.browser) {
      state.games = JSON.parse(localStorage.getItem('games'));
    }
  },
  addGame(state, game) {
    state.games.push(game);
    if (process.browser) {
      localStorage.setItem('games', JSON.stringify(state.games));
    }
  },
  newPlayer(state, params) {
    const player = {
      name: params.name,
      score: 0,
    };
    state.games.find((g) => g.name === params.game.name).players.push(player);
    if (process.browser) {
      localStorage.setItem('games', JSON.stringify(state.games));
    }
  },
  removePlayer(state, params) {
    const players = state.games.find((g) => g.name === params.game.name)
      .players;
    state.games.find(
      (g) => g.name === params.game.name
    ).players = players.filter((p) => p.name !== params.name);
    if (process.browser) {
      localStorage.setItem('games', JSON.stringify(state.games));
    }
  },
};

export const actions = {
  setGames({ commit }) {
    commit('setGames');
  },
  newGame({ commit }, name) {
    const game = {
      players: [],
      name,
    };
    commit('addGame', game);
  },
  newPlayer({ commit }, { game, name }) {
    commit('newPlayer', { game, name });
  },
  removePlayer({ commit }, { game, name }) {
    commit('removePlayer', { game, name });
  },
};

export const getters = {
  getGames(state) {
    return state.games;
  },
};
