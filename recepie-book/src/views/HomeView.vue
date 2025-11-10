<template>
  <main>
    <h1>Recepie Book</h1>
    <div>
      <input type="text" v-model="searchQuery" />
    </div>
    <!-- ako postoji bar jedan element u nizu recepies onda se prikazuje -->
    <nav v-if="filteredRecepies.length > 0">
      <ul>
        <li v-for="recepie in filteredRecepies" :key="recepie.id">
          <RouterLink :to="{ name: 'recepie', params: { id: recepie.id } }">{{
            recepie.name
          }}</RouterLink>
        </li>
      </ul>
    </nav>
    <div v-else>No recepies found!</div>
  </main>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useRecepieStore } from '@/stores/recepie';
import { computed, ref } from 'vue';

const recepieStore = useRecepieStore();
const searchQuery = ref('');
const filteredRecepies = computed(() => recepieStore.filteredRecepies(searchQuery.value));
</script>
