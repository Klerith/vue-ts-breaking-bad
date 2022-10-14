<script setup lang="ts">
import { ref } from 'vue';
import CharacterCard from '@/characters/components/CharacterCard.vue';

import breakingBadApi from '@/api/breakingBadApi';
import type { Character } from '@/characters/interfaces/character';
import { useCharacters } from '@/characters/composables/useCharacters';
import { useQuery } from '@tanstack/vue-query';

//! 1- Normal suspense
// const { data: characters } = await breakingBadApi.get<Character[]>('/characters');
// const characters = ref<Character[]>( data );

//! 2- Composable functions
// const { isLoading, characters, hasError, errorMessage } = useCharacters();

//! 3- TanStack Query
const getCharactersSlow = async():Promise<Character[]> => {

    return new Promise( (resolve) => {
        setTimeout( async() => {
            const { data } = await breakingBadApi.get<Character[]>('/characters');
            resolve(data.filter( character => ![14, 17, 39].includes(character.char_id) ) );
        }, 1)

    });
}

const { isLoading, isError, data: characters, error } = useQuery(
    ['characters'],
    getCharactersSlow,
    {
        cacheTime: 1000 * 60,
        refetchOnReconnect: 'always'
    }
);


</script>
<template>
    <h1 v-if="isLoading">Loading...</h1>
    
    <div class="card-list">
        <CharacterCard
            v-for="character of characters"
            :key="character.char_id"
            :character="character"
        />
    </div>
</template>


<style scoped>
.card-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>