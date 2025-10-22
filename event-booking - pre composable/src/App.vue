<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>

    <EventList @register="handleRegistration($event)" />

    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-4">
      <template v-if="!bookingsLoading">
        <BookingItem
          v-for="b in bookings"
          :key="b.id"
          :title="b.eventTitle"
          :status="b.status"
          @cancelled="cancelBooking(b.id)"
        />
      </template>
      <template v-if="bookingsLoading">
        <LoadingBookingItem v-for="i in 4" :key="i" />
      </template>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import BookingItem from '@/components/BookingItem.vue';
import LoadingBookingItem from '@/components/LoadingBookingItem.vue';
import EventList from '@/components/EventList.vue';

const bookings = ref([]);
const bookingsLoading = ref(false);

const handleRegistration = async (event) => {
  // proverava se da li je event vec bukiran za ovog user-a
  // some() metoda prolazi kroz elemente u bookings.value i ako naidje na makar jedan element koji ispunjava uslov(proveru) vraca true
  if (bookings.value.some((booking) => booking.eventId === event.id && booking.userId === 1)) {
    alert('You are already registred for this event.');
    return;
  }

  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title,
    status: 'pending',
  };

  // Optimistic UI - newBooking se dodaje u bookings listu
  bookings.value.push(newBooking);

  try {
    const response = await fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newBooking,
        status: 'confirmed',
      }),
    });

    // sada treba da se verifikuje da li je event bukiran pravilno
    if (response.ok) {
      const index = findBookingIndexById(newBooking.id);
      // ako je pravilno bukiran onda onda se booking u newBooking listi menja sa ovim koji je vracen u response-u
      // kada se u bookings listu upise booking iz response-a u UI-u ce se videti promena i to: status ce se promeniti iz pending u confirmed
      bookings.value[index] = await response.json();
    } else {
      throw new Error('Failed to confirm booking');
    }
  } catch (e) {
    console.error(`Failed to register for event: `, e);
    // ako booking nije uspesno dodat u bookings na backendu onda se uklanja iz liste u vue aplikaciji
    // korisit se filter() i kreira se novi niz koji ce sadrzati sve booking elemente osim novog - proverava se po id-u
    bookings.value = bookings.value.filter((b) => b.id !== newBooking.id);
  }
};

const fetchBookings = async () => {
  bookingsLoading.value = true;
  try {
    // posto je await ovo ce cekati 3 sekunde posto smo takav delay podesili u json-serveru
    const response = await fetch('http://localhost:3001/bookings');
    bookings.value = await response.json();
  } finally {
    bookingsLoading.value = false;
  }
};

const cancelBooking = async (bookingId) => {
  const index = findBookingIndexById(bookingId);
  const originalBooking = bookings.value[index];
  bookings.value.splice(index, 1);

  try {
    const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Booking could not be cancelled.');
    }
  } catch (error) {
    console.error('Failed to cancel booking.', e);
    // ako request za uklanjanje booking-a ne uspe onda se u listu bookings vraca originalBooking i to na isto mesto gde je i bio
    bookings.value.splice(index, 0, originalBooking);
  }
};

const findBookingIndexById = (bookingId) => {
  return bookings.value.findIndex((b) => b.id === bookingId);
};

const findBookingById = (bookingId) => {
  return bookings.value.find((b) => b.id === bookingId);
};

onMounted(() => {
  fetchBookings();
});
</script>
<style scoped></style>
