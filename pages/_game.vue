<template>
  <div>
    <h1 v-if="game" class="text-2xl text-gray-900 dark:text-white">
      {{ game.name }}
    </h1>
    <div v-if="game && game.players.length < 4">
      <button
        v-if="!create"
        class="inline-flex px-4 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:shadow-outline focus:outline-none"
        @click="create = true"
      >
        Agregar Jugador
      </button>
      <div v-else>
        <form class="flex justify-center mt-6" @submit.prevent="createPlayer">
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Nombre del Jugador"
            class="flex-grow w-full px-4 py-2 mb-4 mr-4 text-base text-gray-700 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-500 sm:mb-0 focus:bg-white"
          />
          <button
            type="submit"
            class="inline-flex px-4 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:shadow-outline focus:outline-none"
          >
            Agregar
          </button>
        </form>
      </div>
      <div
        v-for="(error, key) in errors"
        :key="key"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      >
        {{ error }}
      </div>
    </div>
    <div
      v-if="game && game.players.length > 0"
      class="mt-5 text-gray-900 dark:text-white flex flex-wrap text-center"
    >
      <table class="table-fixed w-full border border-solid border-gray-200">
        <thead>
          <tr class="border border-solid border-gray-200">
            <th class="w-1/5">#</th>
            <th v-for="player in game.players" :key="player.name" class="w-1/5">
              {{ player.name }}
              <button @click="removePlayer({ game, name: player.name })">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style="height: 1em"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <td
            v-for="g in status"
            :key="g.name"
            class="border border-solid border-gray-200"
          >
            {{ g.name }}
          </td>
        </tbody>
        <tfoot>
          <tr>
            <td class="w-1/5"></td>
            <td v-for="player in game.players" :key="player.name" class="w-1/5">
              <form @submit.prevent>
                <input class="w-full border-none bg-gray-900" type="number" />
              </form>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      create: false,
      name: '',
      game: null,
      status: [],
      errors: [],
    };
  },
  computed: {
    ...mapState(['games']),
  },
  mounted() {
    if (this.games.length < 0) this.$router.push('/');
    this.game = this.getGame();
  },
  methods: {
    ...mapActions(['newPlayer', 'removePlayer']),
    getGame() {
      const game = this.games.filter(
        (g) => g.name === this.$route.params.game
      )[0];
      if (game) {
        return game;
      } else {
        this.$router.push('/');
      }
    },
    createPlayer() {
      if (this.game.players.find((g) => g.name === this.name)) {
        this.errors.push('Ya existe un jugador con ese nombre.');
        setTimeout(() => {
          this.errors = [];
        }, 3000);
        this.create = false;
        this.name = '';
        return;
      }
      this.newPlayer({ game: this.game, name: this.name });
      this.create = false;
      this.name = '';
    },
  },
};
</script>
