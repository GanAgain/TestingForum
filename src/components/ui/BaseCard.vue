<template>
  <div :class="['rounded-lg mx-auto p-8 max-w-3xl', mode && mode === 'auth' ? 'border-2 border-gray-300' : '']">
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