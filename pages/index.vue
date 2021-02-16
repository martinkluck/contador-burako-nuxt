<template>
  <div>
    <h1 class="text-2xl text-gray-900 dark:text-white">Contador Burako</h1>
    <div>
      <button
        v-if="!create"
        class="inline-flex px-4 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:shadow-outline focus:outline-none"
        @click="create = true"
      >
        Crear Nueva Partida
      </button>
      <div v-else>
        <form class="flex justify-center mt-6" @submit.prevent="createGame">
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Nombre de la partida"
            class="flex-grow w-full px-4 py-2 mb-4 mr-4 text-base text-gray-700 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-500 sm:mb-0 focus:bg-white"
          />
          <button
            type="submit"
            class="inline-flex px-4 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:shadow-outline focus:outline-none"
          >
            Crear
          </button>
        </form>
        <div
          v-for="(error, key) in errors"
          :key="key"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        >
          {{ error }}
        </div>
      </div>
      <div
        v-if="games.length > 0"
        class="mt-5 text-gray-900 dark:text-white flex flex-wrap text-center"
      >
        <div
          v-for="game in games"
          :key="game.name"
          class="px-8 py-6 lg:px-24 lg:w-2/4 md:w-full"
        >
          {{ game.name }}
          <nuxt-link
            :to="game.name"
            class="inline-flex px-4 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:shadow-outline focus:outline-none"
            >Entrar</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      create: false,
      name: '',
      errors: [],
    };
  },
  computed: {
    ...mapGetters({
      games: 'getGames',
    }),
  },
  mounted() {
    this.setGames();
  },
  methods: {
    ...mapActions(['newGame', 'setGames']),
    createGame() {
      if (this.games.find((g) => g.name === this.name)) {
        this.errors.push('Ya existe una partida con ese nombre.');
        setTimeout(() => {
          this.errors = [];
        }, 3000);
        return;
      }
      this.newGame(this.name);
      this.create = false;
      this.name = '';
    },
  },
};
</script>
