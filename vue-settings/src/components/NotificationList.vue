<template>
  <Teleport to="body">
    <ol class="notification-list">
      <li v-for="n in notifications" :key="n.id" class="notification-item">
        <div class="text-sm font-semibold">
          {{ n.message }}
        </div>
        <button @click="removeNotification(n.id)" class="notification-ack-button">OK</button>
      </li>
    </ol>
  </Teleport>
</template>

<script setup lang="ts">
import { useNotifications } from '@/composables/useNotifications';

const { notifications, removeNotification } = useNotifications();
</script>
