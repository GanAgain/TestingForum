<template>
  <button v-if="!link" :class="[mode, { 'dark-mode': isDark }]">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="[mode, { 'dark-mode': isDark }]">
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
const isDark = computed(function(){
    return store.getters['getDarkMode']
})

</script>

<style scoped>
*{
  font-size: 1.1rem;
}
.normal {
  background-color: #4BD648;
  font-weight: bold;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 25px;
  padding: .5rem 1rem;
  margin-left: auto;
  margin-bottom: 1rem;
  display: flex;
}
.flat {
  color: black;
  background-color: inherit;
  font-weight: bold;
  cursor: pointer;
  border: 2px solid #4BD648;
  border-radius: 25px;
  padding: .5rem 1rem;
  margin-left: auto;
  display: flex;
  transform: 2s;
}
a{
  transform: 2s;
}
.flat.dark-mode{
  color: white;
  transform: 2s;
}
</style>