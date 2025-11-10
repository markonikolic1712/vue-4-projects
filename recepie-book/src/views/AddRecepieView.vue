<template>
  <div>Add form</div>
  <form @submit.prevent="addRecepie">
    <div>
      <input type="text" v-model="name" placeholder="Recepie name" required />
    </div>
    <div>
      <textarea v-model="description" placeholder="Recepie description" required></textarea>
    </div>
    <button type="submit">Add</button>
  </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useRecepieStore } from '@/stores/recepie';

const router = useRouter();

const store = useRecepieStore();
const name = ref('');
const description = ref('');

const addRecepie = () => {
  const newRecepie = store.addRecepie({ name: name.value, description: description.value });

  router.push({
    name: 'recepie',
    params: {
      id: newRecepie.id,
    },
  });
};
</script>
