<template>
    <section>
        <base-dialog :show="!!error" title="Wystąpił Błąd!" @close="handleError">
        <p>{{ error }}</p>
        </base-dialog>
        <h2 v-if="info.result">Twój najlepszy wynik: {{ info.result }}</h2>
        <form @submit.prevent="submitQuiz">
            
            <base-spinner v-if="isLoading"></base-spinner>
            <ul v-else-if="questionsExist && !isLoading">
                <QuizItem
                    v-for="question in questions"
                    :key="question.id"
                    :question="question"
                    @set-answer="addAnswer"
                />
            </ul>
            <h3 v-else style="text-align: center;">Nie udało się wczytać pytań do quizu!</h3>
            <p v-if="!quizIsValid">Zaznacz wszystkie odpowiedzi!</p>
            <base-button mode="normal">Potwierdź</base-button>
        </form>
    </section>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import QuizItem from '@/components/quiz/QuizItem.vue';

const store = useStore()
const error = ref(null)
const isLoading = ref(false)

// user info
const info = computed(function(){
    return store.getters['users/userInfo']
})

// questions
const questionsExist = computed(function(){
    return store.getters['quiz/questionsExist']
})

async function loadQuestions(){
    try{
        isLoading.value = true
        await store.dispatch('quiz/fetchQuestions')
    } catch(err){
        error.value = err.message || 'Wystąpił błąd!';
    }
    isLoading.value = false
}

loadQuestions()

const questions = computed(function(){
      return store.getters['quiz/questions']
})

// answers
const answers = ref({})
const quizIsValid = ref(true)
const sumPoints = ref(0)

function addAnswer(answer){
    Object.assign(answers.value, answer);
}

async function submitQuiz(){
    if(questions.value.length !== Object.keys(answers.value).length){
        quizIsValid.value = false
        return
    }
    quizIsValid.value = true

    questions.value.forEach(question => {
    const questId = question.id;
    const correctAns = question.correct;
        if (answers.value[questId] === correctAns) {
            sumPoints.value += question.points
        }
    });

    if(sumPoints.value > info.value.result || !info.value.result){
        try{
            await store.dispatch('users/changeUserResult', sumPoints.value)
        } catch(err){
            error.value = err.message || 'Failed to set results.';
        }
    }
}

// error
function handleError(){
  error.value = null
}

</script>

<style scoped>
form{
    max-width: 60%;
    margin: 0 auto;
}
ul{
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 100%;
}
h2{
    margin: 0;
    padding: 1rem;
    border-bottom: 2px solid #4BD648;
    display: inline-block;
}
</style>