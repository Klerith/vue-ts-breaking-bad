<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';

import breakingBadApi from '@/api/breakingBadApi';
import characterStore from '@/store/characters.store';
import type { Character } from '@/characters/interfaces/character';


const route = useRoute();

const { id } = route.params as { id: string };

const getCharacterCacheFirst = async( characterId: string ):Promise<Character> => {
    if ( characterStore.checkIdInStore(characterId) ) {
        return characterStore.ids.list[characterId];
    }

    const { data } = await breakingBadApi.get<Character[]>(`/characters/${ characterId }`);
    return data[0];
}

const { data: character } = useQuery(
    [ 'characters', id ],
    () => getCharacterCacheFirst(id),
    {
        onSuccess( character ) {
            characterStore.loadedCharacter(character);
        }
    }
)   


</script>

<template>
    <h1 v-if="!character">Loading...</h1>

    <div v-else>
        <h1>{{ character.name }}</h1>
        <div class="character-container">
            <img :src="character.img" :alt="character.name">
            <ul>
                <li>Apodo: {{ character.nickname }}</li>
                <li>Nació: {{ character.birthday }}</li>
                <li>Serie: {{ character.category }}</li>
                <li>Ocupación: {{ character.occupation.join(', ') }}</li>
                <li>Actor: {{ character.portrayed }}</li>
                <li>Estado: {{ character.status }}</li>
                <li>Temporadas: {{ character.appearance.join(', ') }}</li>
            </ul>
        </div>
    </div>
</template>


<style scoped>
.character-container {
    display: flex;
    flex-direction: row;
}

img {
    width: 150px;
    border-radius: 5px;
}

</style>