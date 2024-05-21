<template>
  <li :class="{ 'dark-mode': isDark, [difficulty]: true }">
    <div id="top">
      <h2>{{ question.question }}</h2>
    </div>
    <div id="options">
      <div class="option">
        <input type="radio" :name="question.id" :id="`option-one-${question.id}`" @change="setAnswer(1)">
        <label :for="`option-one-${question.id}`">{{ question.answers[1] }}</label>
      </div>
      <div class="option">
        <input type="radio" :name="question.id" :id="`option-two-${question.id}`" @change="setAnswer(2)">
        <label :for="`option-two-${question.id}`">{{ question.answers[2] }}</label>
      </div>
      <div class="option">
        <input type="radio" :name="question.id" :id="`option-three-${question.id}`" @change="setAnswer(3)">
        <label :for="`option-three-${question.id}`">{{ question.answers[3] }}</label>
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
const isDark = computed(function(){
    return store.getters['getDarkMode']
})

// color based on difficulty
const difficulty = computed(function(){
      if(props.question.points === 1){
        return 'green'
      }else if(props.question.points === 2){
        return 'yellow'
      }else {
        return 'red'
      }
})

// setting answer
const emit = defineEmits(['set-answer']);

function setAnswer(value){
  const updatedAnswer = {
    [props.question.id]: value
  }
  emit('set-answer', updatedAnswer)
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 2px solid rgb(66, 66, 66);
  border-radius: 25px;
  padding: 1rem;
}
li:not(.dark-mode) {
  transition: 2s;
}
li.red {
  border: 2px solid rgb(255, 77, 77);
}
li.yellow:not(.dark-mode) {
  border: 2px solid rgb(255, 222, 77);
  transition: 2s;
}
li.yellow.dark-mode {
  border: 2px solid rgb(243, 255, 77);
  transition: 2s;
}
li.green {
  border: 2px solid rgb(83, 255, 77);
}
h2 {
  margin: 1rem;
}
#options {
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 1rem;
  border-radius: 8px;
}
.option {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  margin: 0 1%; 
  padding: 0.5rem;
  background-color: #d4d4d4;
  border-radius: 8px;
  transition: background-color 0.3s;
}
.option input {
  margin-bottom: 0.5rem;
}
.option input + label{
  cursor: pointer;
  padding: 0.5rem;
  background-color: rgb(160, 158, 158);
  color: white;
  border-radius: 8px;
  width: 100%;
  text-align: center;
}
.option input:checked + label {
  background-color: grey;
  color: #4BD648;
  font-weight: bold;
  border-radius: 8px;
  width: 100%;
  text-align: center;
}
p {
  margin-bottom: 0;
}
a {
  text-decoration: none;
  color: #4BD648;
  font-weight: bold;
}
</style>