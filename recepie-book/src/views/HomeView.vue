<template>
  <main>
    <h1 class="text-2xl font-bold mb-4">Recepie Book</h1>
    <div>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search recepies..."
        class="p-2 border rounded mb-4 w-full"
      />
    </div>
    <!-- ako postoji bar jedan element u nizu recepies onda se prikazuje -->
    <RecepieList :recepies="filteredRecepies" />
  </main>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useRecepieStore } from '@/stores/recepie';
import { computed, ref } from 'vue';
import RecepieList from '@/components/RecepieList.vue';

const recepieStore = useRecepieStore();
const searchQuery = ref('');
const filteredRecepies = computed(() => recepieStore.filteredRecepies(searchQuery.value));
</script>
