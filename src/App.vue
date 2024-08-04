<script setup lang="ts">
import text from './api/mock/data/mock-data.json';
import Marker from './utils/marker';
import { onMounted } from 'vue';

const marker = new Marker({
  className: 'highlight',
})

onMounted(() => {
  marker.init();
 
})

const select = marker.mark;
const unselect = marker.unmark;

const options = {
  itemHeight: 40,
}
const wrapper = {
  height: '90vh',
}
</script>

<template>
  <button @click="select">Mark</button>
  <button @click="unselect ">Unmark</button>
  <div id='text' data-selectable>
    <p v-for="item in text" :key="item.id" v-html="item.text"></p>
  </div>
</template>

<style scoped>

</style>
