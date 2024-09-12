import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useGamesStore = defineStore("games", () => {
    const games = ref(null)
    async function fetchGames() {
        try {
            const url = '/api/juegos.json'
            const response = await axios.get(url)
            const { data } = response
            games.value = data
        } catch (error) {
            console.error(error)
        }
    }

    return {
        games,
        fetchGames
    }
})