<template>
  <h1 class="text-2xl font-bold mb-4">Add form</h1>
  <form @submit.prevent="addRecepie" class="space-y-4">
    <div>
      <input
        type="text"
        v-model="name"
        placeholder="Recepie name"
        required
        class="p-2 border rounded w-full"
      />
    </div>
    <div>
      <textarea
        v-model="description"
        placeholder="Recepie description"
        required
        class="p-2 border rounded w-full"
      ></textarea>
    </div>
    <button type="submit" class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">Add</button>
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
