<script setup lang="ts">
import { toRef } from 'vue';
import type { Character } from '../interfaces/character';

const props = defineProps<{ character: Character }>();
const character = toRef(props, 'character');


</script>

<template>
    <div class="character-card">
        <img :src="character.img" :alt="character.name">
        <h3>{{ character.name }}</h3>
    </div>
    <!-- <div v-if="![14, 17, 39].includes(character.char_id)" class="character-card">
        <img :src="character.img" :alt="character.name">
        <h3>{{ character.name }}</h3>
    </div> -->

    <!-- <div class="character-card">
        <img v-if="[14, 17, 39].includes(character.char_id)" src="https://www.crescenttide.com/wp-content/uploads/2019/07/no-avatar-300x300.png" alt="No image" />
        <img v-else :src="character.img" :alt="character.name">
        <h3>{{ character.name }}</h3>
    </div> -->
</template>


<style scoped>
.character-card {
    margin-right: 5px;
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
}

img { 
    width: 150px;
    border-radius: 5px 5px 0px 0px;
    box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.1);
}
</style>