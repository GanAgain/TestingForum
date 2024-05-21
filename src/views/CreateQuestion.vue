<template>
  <section>
    <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card mode="auth">
      <h2>Utwórz pytanie</h2>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="question">Pytanie</label>
          <input
            type="text"
            id="question"
            v-model.trim="question"
          />
        </div>
        <div class="form-control">
          <label>Punkty</label>
          <div class="option-group">
            <div class="option">
              <input type="radio" name="points" :id="`points-one`" @change="setPoints(1)" class="difficulty-1">
              <label :class="{ 'dark-mode': isDark }" :for="`points-one`">1</label>
            </div>
            <div class="option">
              <input type="radio" name="points" :id="`points-two`" @change="setPoints(2)" class="difficulty-2">
              <label :class="{ 'dark-mode': isDark }" :for="`points-two`">2</label>
            </div>
            <div class="option">
              <input type="radio" name="points" :id="`points-three`" @change="setPoints(3)" class="difficulty-3">
              <label :class="{ 'dark-mode': isDark }" :for="`points-three`">3</label>
            </div>
          </div>
        </div>
        <div class="form-control">
          <label for="ans1">Odpowiedź 1</label>
          <input
            type="text"
            id="ans1"
            v-model.trim="answers[1]"
          />
        </div>
        <div class="form-control">
          <label for="ans2">Odpowiedź 2</label>
          <input
            type="text"
            id="ans2"
            v-model.trim="answers[2]"
          />
        </div>
        <div class="form-control">
          <label for="ans3">Odpowiedź 3</label>
          <input
            type="text"
            id="ans3"
            v-model.trim="answers[3]"
          />
        </div>
        <div class="form-control">
          <label>Poprawna odpowiedź</label>
          <div class="option-group">
            <div class="option">
              <input type="radio" name="correct" :id="`correct-one`" @change="setAnswer(1)" :class="`difficulty-${points}`">
              <label :class="{ 'dark-mode': isDark }" :for="`correct-one`">1</label>
            </div>
            <div class="option">
              <input type="radio" name="correct" :id="`correct-two`" @change="setAnswer(2)" :class="`difficulty-${points}`">
              <label :class="{ 'dark-mode': isDark }" :for="`correct-two`">2</label>
            </div>
            <div class="option">
              <input type="radio" name="correct" :id="`correct-three`" @change="setAnswer(3)" :class="`difficulty-${points}`">
              <label :class="{ 'dark-mode': isDark }" :for="`correct-three`">3</label>
            </div>
          </div>
        </div>
        <p v-if="!questionIsValid">Wypełnij wszystkie pola!</p>
        <base-button mode="normal">Dodaj Pytanie</base-button>
      </form>
    </base-card>
  </section>
</template>



  
<script setup>
import { useStore } from 'vuex';
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore()
const error = ref(null)
const router = useRouter()

// dark mode
const isDark = computed(function(){
    return store.getters['getDarkMode']
})

// form operations
const question = ref('')
const questionIsValid = ref(true)

const answers = reactive({
  1: '',
  2: '',
  3: ''
})

const points = ref('')

function setPoints(val){
  points.value = val
}

const correct = ref('')

function setAnswer(val){
  correct.value = val
}

async function submitForm(){

    if(question.value == '' || points.value == '' || correct.value == '' ||
      Object.values(answers).some(answer => answer === '')
    ){
      questionIsValid.value = false
      return
    }

    questionIsValid.value = true
    const formData = {
        pytanie: question.value,
        punkty: points.value,
        poprawna: correct.value,
        odpowiedzi: answers
    }

    try{
      await store.dispatch('quiz/addQuestion', formData)
      router.replace('/articles')
    } catch(err){
      error.value = err.message || 'Nie udało się dodać pytania. Spróbuj później.';
    }
}

// error  
function handleError(){
  error.value = null
}

</script>
  
<style scoped>
section{
  padding-top: 3rem;
}
h2{
  text-align: center;
}
form {
  max-width: 40rem;
  margin: 0 auto;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="text"],
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 4px;
  font: inherit;
  margin-bottom: 1rem;
}

.option-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.option {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.option input[type="radio"] {
  margin-right: 0.5rem;
}

.option label {
  background-color: #d4d4d4;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
.option label.dark-mode{
  background-color: rgb(160, 158, 158);
}

.option input[type="radio"]:checked + label {
  background-color: rgb(160, 158, 158);
  font-weight: bold;
}
.option input[type="radio"]:checked + label.dark-mode{
  background-color: grey;
}

.option input[type="radio"]:checked.difficulty-1 + label {
  color: rgb(83, 255, 77);
}

.option input[type="radio"]:checked.difficulty-2 + label {
  color: rgb(255, 222, 77);
}

.option input[type="radio"]:checked.difficulty-3 + label {
  color: rgb(255, 77, 77);
}

p {
  margin: 1rem 0;
  color: red;
  font-weight: bold;
  text-align: center;
}

</style>
