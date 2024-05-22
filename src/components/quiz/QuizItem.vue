<template>
  <li :class="{ 'dark-mode': isDark, [difficultyClass]: true }" class="m-4 p-4 border rounded-lg">
    <div id="top">
      <h2 class="my-4 text-lg font-bold">{{ question.question }}</h2>
    </div>
    <div id="options" class="flex justify-between items-center">
      <div class="option flex-1 mr-2">
        <input type="radio" :name="question.id" :id="`option-one-${question.id}`" @change="setAnswer(1)" class="hidden">
        <label :for="`option-one-${question.id}`" class="block py-2 px-4 rounded-lg bg-gray-600 text-white cursor-pointer transition-colors duration-300 hover:bg-gray-700 select-none">{{ question.answers[1] }}</label>
      </div>
      <div class="option flex-1 mx-2">
        <input type="radio" :name="question.id" :id="`option-two-${question.id}`" @change="setAnswer(2)" class="hidden">
        <label :for="`option-two-${question.id}`" class="block py-2 px-4 rounded-lg bg-gray-600 text-white cursor-pointer transition-colors duration-300 hover:bg-gray-700 select-none">{{ question.answers[2] }}</label>
      </div>
      <div class="option flex-1 ml-2">
        <input type="radio" :name="question.id" :id="`option-three-${question.id}`" @change="setAnswer(3)" class="hidden">
        <label :for="`option-three-${question.id}`" class="block py-2 px-4 rounded-lg bg-gray-600 text-white cursor-pointer transition-colors duration-300 hover:bg-gray-700 select-none">{{ question.answers[3] }}</label>
      </div>
    </div>
  </li>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, defineProps, defineEmits } from 'vue';

const store = useStore()

const props = defineProps({
  question: Object
})

//dark mode
const isDark = computed(() => store.getters['getDarkMode'])

// color based on difficulty
const difficultyClass = computed(() => {
  if (props.question.points === 1) {
    return 'border-2 border-green-500';
  } else if (props.question.points === 2) {
    return 'border-2 border-yellow-500';
  } else {
    return 'border-2 border-red-500';
  }
});

// setting answer
const emit = defineEmits(['set-answer']);

function setAnswer(value) {
  const updatedAnswer = {
    [props.question.id]: value
  }
  emit('set-answer', updatedAnswer)
}
</script>

<style scoped>
h2 {
  margin: 1rem;
}

input:checked + label {
  background-color: gray;
  color: #4BD648;
  font-weight: bold;
}

li {
  transition: 2s;
}

.dark-mode li {
  transition: 2s; 
}

.dark-mode input:checked + label {
  background-color: #4A5568;
}

.option label {
  font-size: 1rem;
  background-color: #a0a0a0;
}
</style>
