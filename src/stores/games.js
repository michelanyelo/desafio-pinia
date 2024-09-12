import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"

export const useGamesStore = defineStore("games", () => {
    // Estado reactivo para almacenar los juegos
    const games = ref(null)

    // Función para obtener la lista de juegos desde la API
    async function fetchGames() {
        try {
            const url = '/api/juegos.json'
            const response = await axios.get(url)
            const { data } = response
            games.value = data // Actualiza el estado con los datos obtenidos
        } catch (error) {
            console.error(error) // Manejo de errores en caso de fallo en la petición
        }
    }

    // Función para aumentar el stock de un juego específico
    function aumentarStock(id) {
        const game = games.value.find((game) => game.codigo === id)
        if (game) {
            game.stock++ // Incrementa el stock del juego
        }
    }

    // Función para disminuir el stock de un juego específico
    function disminuirStock(id) {
        const game = games.value.find((game) => game.codigo === id)
        game ?
            game.stock > 0 ?
                game.stock-- : // Decrementa el stock si hay suficiente
                alert(`No hay suficiente stock para rebajar del juego: ${game.nombre}`) // Mensaje si no hay suficiente stock
            : alert('Juego no encontrado') // Mensaje si el juego no es encontrado
    }

    return {
        games,
        fetchGames,
        aumentarStock,
        disminuirStock
    };
});
