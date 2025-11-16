<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">{{ recepie?.name }}</h1>
    <p class="mb-4">{{ recepie?.description }}</p>
    <div class="flex items-center gap-4">
      <RouterLink
        :to="{ name: 'edit-recepie', params: { id: recepie?.id } }"
        class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
        >Edit recepie</RouterLink
      >
      <button
        v-if="recepie"
        @click="recepieStore.toggleFavorite(recepie?.id as string)"
        class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
      >
        {{ isFavorite ? 'Remove from favorites' : 'Add to favorites' }}
      </button>
    </div>
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
