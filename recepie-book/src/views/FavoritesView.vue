<template>
  <div>
    <h1>Favorite Recepies</h1>
    <RecepieList :recepies="favoriteRecepies" />
  </div>
</template>

<script setup lang="ts">
import RecepieList from '@/components/RecepieList.vue';
import { useRecepieStore } from '@/stores/recepie';
import { computed } from 'vue';

const store = useRecepieStore();
const favoriteRecepies = computed(() => store.favoriteRecepies);
</script>