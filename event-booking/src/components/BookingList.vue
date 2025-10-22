<template>
  <template v-if="error">
    <ErrorCard :retry="fetchBookings">Failed to fetch bookings. Please try again. </ErrorCard>
  </template>
  <template v-else>
    <section class="grid grid-cols-1 gap-4">
      <template v-if="!loadnig">
        <BookingItem
          v-for="b in bookings"
          :key="b.id"
          :title="b.eventTitle"
          :status="b.status"
          @cancelled="cancelBooking(b.id)"
        />
      </template>
      <template v-if="loadnig">
        <LoadingBookingItem v-for="i in 4" :key="i" />
      </template>
    </section>
  </template>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import BookingItem from '@/components/BookingItem.vue';
import LoadingBookingItem from '@/components/LoadingBookingItem.vue';
import useBookings from '@/composables/useBookings';
import ErrorCard from '@/components/ErrorCard.vue';

const { loadnig, fetchBookings, bookings, cancelBooking, error } = useBookings();

onMounted(() => {
  fetchBookings();
});
</script>
