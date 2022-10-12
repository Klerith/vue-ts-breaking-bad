<script setup lang="ts">

import { ref } from 'vue';
const counter = ref<number>(0);

</script>

<template>
  <div class="wrapper">
    <h1>Counter: {{ counter }}</h1>
    <button @click="counter++">+1</button>
  </div>
</template>

<style scoped>

.wrapper {
  display: flex;
  flex-direction: column;
}

</style>
