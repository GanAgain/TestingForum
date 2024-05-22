<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="fixed top-0 left-0 h-screen w-full bg-black bg-opacity-75 z-10"></div>
    <dialog open v-if="show" class="fixed top-[20vh] left-[10%] w-[80%] z-[100] rounded-lg border-none shadow-lg p-0 m-0 overflow-hidden bg-white md:left-1/2 md:w-[40rem] md:transform md:-translate-x-1/2">
        <header class="bg-project-green text-white w-full p-4">
            <slot name="header">
                <h2 class="m-0">{{ title }}</h2>
            </slot>
        </header>
        <section class="p-4">
            <slot></slot>
        </section>
        <menu v-if="!fixed" class="p-4 flex justify-end m-0">
            <slot name="actions">
                <base-button @click="tryClose" mode="normal">Zamknij</base-button>
            </slot>
        </menu>
    </dialog>
  </teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    }
})

const emit = defineEmits(['close']);

function tryClose(){
    if(props.fixed){
        return;
    }
    emit('close')
}
</script>

<style scoped>
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
