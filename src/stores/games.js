import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useGamesStore = defineStore("games", () => {
    const games = ref(null)
    // const aumentar = ref(0)
    // const disminuir = ref(0)
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

    function aumentarStock(id) {
        const game = games.value.find((game) => game.codigo === id)
        if (game) {
            game.stock++
        }
    }

    function disminuirStock(id) {
        const game = games.value.find((game) => game.codigo === id)
        game ?
            game.stock > 0 ?
                game.stock-- :
                alert(`No hay suficiente stock para rebajar del juego: ${game.nombre}`)
            : alert('Juego no encontrado');
    }

    return {
        games,
        fetchGames,
        aumentarStock,
        disminuirStock
    }
})