<template>
  <div >
    <nav v-if="recepies.length > 0">
      <ul>
        <li v-for="recepie in recepies" :key="recepie.id" class="mb-2">
          <RouterLink
            :to="{ name: 'recepie', params: { id: recepie.id } }"
            class="text-amber-600 hover:underline"
            >{{ recepie.name }}</RouterLink
          >
        </li>
      </ul>
    </nav>
    <div v-else class="text-gray-500">No recepies found!</div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useRecepieStore, type Recepie } from '@/stores/recepie';
import { computed, ref } from 'vue';

defineProps<{
  recepies: Recepie[];
}>();
</script>
