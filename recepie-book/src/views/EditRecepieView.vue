<template>
  <div>Add form</div>
  <form @submit.prevent="updateRecepie">
    <div>
      <input type="text" v-model="name" placeholder="Recepie name" required />
    </div>
    <div>
      <textarea v-model="description" placeholder="Recepie description" required></textarea>
    </div>
    <button type="submit">Edit</button>
  </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { useRecepieStore } from '@/stores/recepie';
import { useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const store = useRecepieStore();
const name = ref('');
const description = ref('');

// ova funkcija se poziva kada se radi mount komponente i ona popunjava input polja sa podacima
const fetchRecepie = () => {
  const id = route.params.id as string;
  const recepie = store.getRecepieById(id);
  // ako recepie postoji u store-u onda se popunjavaju podaci koji ce se dodati u input polja i ti podaci mogu da se menjaju
  // ako recepie ne postoji onda se u else{} radi redirektovanje na not-found
  if (recepie) {
    name.value = recepie.name;
    description.value = recepie.description;
  } else {
    router.push({ name: 'not-found' });
  }
};

const updateRecepie = () => {
  store.editRecepie({
    id: route.params.id as string,
    name: name.value,
    description: description.value,
  });

  router.push({
    name: 'recepie',
    params: {
      id: route.params.id as string,
    },
  });
};

onMounted(fetchRecepie);
</script>
