<template>
  <section>
    <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <base-card mode="auth">
      <h2>{{ switchModeHeader }}</h2>
      <form @submit.prevent="submitForm">
        <div class="form-control" v-if="mode === 'signup'">
          <label for="name">Nazwa</label>
          <input type="name" id="name" v-model.trim="name">
        </div>
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email">
        </div>
        <div class="form-control">
          <label for="password">Hasło</label>
          <input type="password" id="password" v-model.trim="password">
        </div>
        <p
            v-if="!formIsValid"
          >Wstaw poprawny email i hasło! (hasło musi mieć minimum 6 znaków).</p>
        <base-button mode="normal">{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
      </form>
    </base-card>
  </section>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter()
const store = useStore()
const error = ref(null)

// authorization mode
const mode = ref('login')

const submitButtonCaption = computed(function(){
    if(mode.value === 'login'){
      return 'Zaloguj się';
    } else {
      return 'Zarejestruj się';
    }
})

const switchModeButtonCaption = computed(function(){
    if(mode.value === 'login'){
      return 'Rejestracja';
    } else {
      return 'Logowanie';
    }
})

const switchModeHeader = computed(function(){
    if(mode.value === 'login'){
      return 'Zaloguj się';
    } else {
      return 'Utwórz konto';
    }
})

function switchAuthMode(){
  if(mode.value === 'login'){
    mode.value = 'signup'
  } else{
    mode.value = 'login'
  }
}

// form data
const name = ref('')
const email = ref('')
const password = ref('')
const formIsValid = ref(true)
const isLoading = ref(false)

async function submitForm(){
  formIsValid.value = true
  if(
    email.value === '' ||
    !email.value.includes('@') ||
    password.value.length < 6
  ){
    formIsValid.value = false
    return
  }

  isLoading.value = true;

  const actionPayload = reactive({
    email: email.value,
    password: password.value,
    name: name.value
  })

  try{
    if(mode.value === 'login'){
      await store.dispatch('login', actionPayload)
    }
    else{
      await store.dispatch('signup', actionPayload)
    }
    router.replace('/articles')
  } catch(err){
    error.value = err.message || 'Failed to authenticate, try later.';
  }
  isLoading.value = false
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
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 1rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  display: block;
  width: calc(100% - 2rem);
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.5rem;
}

input:focus {
  border-color: #4BD648;
  background-color: rgb(207, 207, 207);
  outline: none;
}

</style>