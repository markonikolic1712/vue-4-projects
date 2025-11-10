<template>
  <header>
    <nav>
      <ul>
        <li>
          <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'favorites' }">Favs</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'add-recepie' }">Add Recepie</RouterLink>
        </li>
      </ul>
    </nav>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import FavoritesView from './views/FavoritesView.vue'
</script>
