<template>
  <div>
    <h1>{{ recepie?.name }}</h1>
    <p>{{ recepie?.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRecepieStore } from '@/stores/recepie';

const route = useRoute();
const recepieStore = useRecepieStore();
const recepie = computed(() => recepieStore.getRecepieById(route.params.id as string));

// posto je route.params.id objekat koji nije reaktivan ne moze da se koristi kao parametar cija se promena prati u watch metodi
// zato se korisri tzv. "geter metoda" () => route.params.id koja vraca vrednost koja je reaktivna
// watch(
//   () => route.params.id,
//   () => {
//     console.log(`Fetching data inside watch. recepie = ` + recepie.value);
//   },
//   { immediate: true },
// );
</script>
