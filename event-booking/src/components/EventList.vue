<template>
  <template v-if="error">
    <ErrorCard :retry="fetchEvents"
      >Could not load events at the moment. Please try again.
    </ErrorCard>
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
            @register="handleRegistration(e)"
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
import useBookings from '@/composables/useBookings';
import ErrorCard from '@/components/ErrorCard.vue';

const { handleRegistration } = useBookings();

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
