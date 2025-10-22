<template>
  <SectionCard>
    <div class="flex justify-between">
      <div class="flex space-x-2">
        <div>{{ title }}</div>
        <!-- <component :is="icon" - sa ovime se prikazuje komponenta koja je izracunata u icon -->
        <!-- ako je pending == true onda se implementira animacija nad ikonom -->
        <div><component :is="icon" :class="{ 'animate-spin': pending }" /></div>
      </div>
      <RoundButton variant="danger" @click="$emit('cancelled')">Cancel</RoundButton>
    </div>
  </SectionCard>
</template>
<script setup>
import { computed } from 'vue';
import SectionCard from '@/components/SectionCard.vue';
import RoundButton from '@/components/RoundButton.vue';
import { LoaderCircle, Check } from 'lucide-vue-next';

const props = defineProps({
  title: String,
  status: String,
});

defineEmits(['cancelled']);

// na osnovu podatka koji je prosledjen u propa (pending ili confirmed) izracunava se true ili false
const pending = computed(() => props.status === 'pending');
// ovde se izracunava koja komponenta/ikona ce se koristiti
const icon = computed(() => (pending.value ? LoaderCircle : Check));
</script>
