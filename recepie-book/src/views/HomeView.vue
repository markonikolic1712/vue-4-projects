<template>
  <main>
    <h1>Recepie Book</h1>
    <div>
      <input type="text" v-model="searchQuery" />
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
