<template>
  <div>
    <h1>{{ recepie?.name }}</h1>
    <p>{{ recepie?.description }}</p>

    <RouterLink :to="{ name: 'edit-recepie', params: { id: recepie?.id } }"
      >Edit recepie</RouterLink
    >
  </div>
  <div>
    <button v-if="recepie" @click="recepieStore.toggleFavorite(recepie?.id as string)">
      {{ isFavorite ? 'Remove from favorites' : 'Add to favorites' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRecepieStore } from '@/stores/recepie';
import { RouterLink } from 'vue-router';

const route = useRoute();
const recepieStore = useRecepieStore();
const recepie = computed(() => recepieStore.getRecepieById(route.params.id as string));
const isFavorite = computed(() =>
  recepie.value ? recepieStore.isFavorite(route.params.id as string) : false,
);

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
