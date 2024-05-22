<template>
  <button v-if="!link" :class="[modeClass, isDarkClass]">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="[modeClass, isDarkClass]">
    <slot></slot>
  </router-link>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const props = defineProps({
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
})

// dark mode
const isDark = computed(() => store.getters['getDarkMode'])

// Mode classes
const buttonVariants = {
  normal: 'bg-project-green font-bold cursor-pointer text-white border-none rounded-full px-4 py-2 ml-auto mb-4 flex',
  flat: 'text-black bg-transparent font-bold cursor-pointer border-2 border-project-green rounded-full px-4 py-2 ml-auto flex transition-transform duration-2000',
}

const modeClass = computed(() => {
  switch (props.mode) {
    case 'normal':
      return buttonVariants.normal;
    case 'flat':
      return buttonVariants.flat;
    default:
      return '';
  }
})

// Dark mode class
const isDarkClass = computed(() => {
  return props.mode === 'flat' && isDark.value ? 'text-white' : '';
})
</script>

<style scoped>
* {
  font-size: 1.1rem;
}
</style>
