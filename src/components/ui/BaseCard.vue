<template>
  <div class="card" :class="mode">
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    mode: {
      type: String,
      required: false,
      default: null
    }
})
</script>

<style scoped>
.card{
    border-radius: 12px;
    margin: 0 auto;
    padding: 2rem;
    max-width: 60%;
}
.auth{
  border: 2px solid lightgrey;
}
</style>