<script setup lang="ts">
import { watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useCharacter from '../composables/useCharacter';

const router = useRouter()
const route  = useRoute();

const { id } = route.params as { id: string };
const { character, hasError, errorMessage, isLoading } = useCharacter( id );

watchEffect(() => {
    if ( !isLoading.value && hasError.value ) {
        router.replace('/characters');
    }
});


</script>

<template>
    <h1 v-if="isLoading">Loading...</h1>
    <h1 v-else-if="hasError">{{ errorMessage }}</h1>

    <div v-else-if="character">
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