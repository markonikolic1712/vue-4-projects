<template>
  <template v-if="error">
    <SectionCard>
      <div class="space-y-4 items-center flex flex-col">
        <div class="text-red-500">Could not load events at the moment. Please try again.</div>
        <div>
          <RoundButton @click="fetchEvents">Retry now</RoundButton>
        </div>
      </div>
    </SectionCard>
  </template>
  <template v-else>
    <section class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      <template v-if="!loading">
        <template v-if="events.length">
          <EventCard
            v-for="e in events"
            :key="e.id"
            :title="e.title"
            :when="e.date"
            :description="e.description"
            @register="$emit('register', e)"
          />
        </template>
        <template v-else>
          <div class="col-span-2 text-center text-gray-500">No events yet.</div>
        </template>
      </template>
      <template v-if="loading"> <LoadingEventCard v-for="i in 4" :key="i" /></template>
    </section>
  </template>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import EventCard from '@/components/EventCard.vue';
import LoadingEventCard from '@/components/LoadingEventCard.vue';
import SectionCard from '@/components/SectionCard.vue';
import RoundButton from '@/components/RoundButton.vue';

defineEmits(['register']);

const events = ref([]);
const loading = ref(false);
// posto ce se u error kasnije setovati objekat onda mora da se inicijalizuje kao null
const error = ref(null);

const fetchEvents = async () => {
  loading.value = true;
  error.value = null;

  try {
    // posto je await ovo ce cekati 3 sekunde posto smo takav delay podesili u json-serveru
    const response = await fetch('http://localhost:3001/events');
    events.value = await response.json();
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchEvents());
</script>
