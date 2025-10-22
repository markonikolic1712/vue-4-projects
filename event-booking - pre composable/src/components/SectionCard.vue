<template>
  <RoundedCard>
    <!-- v-if="$slots.header" -> ako se prosledjuje (ako postoji) podatak header ovaj h3 element se prikazuje -->
    <h3 v-if="$slots.header" class="p-4 font-medium text-xl border-b border-gray-200">
      <slot name="header"></slot>
    </h3>
    <!-- 'p-4' klasa se uvek primenjuje a ostale ('border-b border-gray-200') samo kada postoji (kada se prosledjuje) podatak u $slots.footer -->
    <div v-if="$slots.default" :class="{ 'p-4': true, 'border-b border-gray-200': $slots.footer }">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="p-4">
      <slot name="footer"></slot>
    </div>
  </RoundedCard>
</template>
<script setup>
import RoundedCard from '@/components/RoundedCard.vue';
</script>
