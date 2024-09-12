<template>
    <div class="table-responsive mt-5 text-center">
        <table class="table w-75 mx-auto">
            <thead class="text-uppercase table-light">
                <tr>
                    <th scope="col" v-for="(head, index) in headers" :key="index">{{
                        head }}
                    </th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="game in gamesStore.games" :key="game.codigo">
                    <td v-for="(value, index) in Object.values(game).slice(0, -1)" :key="index">{{ value }}
                    </td>
                    <td>
                        <button class="btn btn-outline-success btn-sm me-3">Agregar</button>
                        <button class="btn btn-outline-danger btn-sm">Quitar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { useGamesStore } from '@/stores/games'
import { mapStores } from 'pinia'

export default {
    data() {
        return {
            headers: []
        }
    },
    methods: {
        // Capturar headers del objeto
        capturarHeaders() {
            if (this.gamesStore.games.length > 0) {
                this.headers = Object.keys(this.gamesStore.games[0])
                // Eliminar columna "color"
                this.headers.pop()
            }
        }
    },
    computed: {
        ...mapStores(useGamesStore)
    },
    created() {
        this.gamesStore.fetchGames().then(() => {
            this.capturarHeaders(); // Capturar los headers una vez que los juegos han sido obtenidos
        });
    }
};
</script>

<style scoped></style>
