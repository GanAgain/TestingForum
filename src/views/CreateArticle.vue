<template>
  <section>
    <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <base-card mode="auth">
      <h2>Utwórz artykuł</h2>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="title">Tytuł</label>
          <input
            type="text"
            id="title"
            v-model.trim="title"
          />
        </div>
        <div class="form-control">
          <label for="description">Treść</label>
          <textarea
            id="description"
            rows="10"
            v-model.trim="description"
          ></textarea>
        </div>
        <p v-if="!articleIsValid">Tytuł i treść nie mogą być puste!</p>
        <base-button mode="normal">Dodaj artykuł</base-button>
      </form>
    </base-card>
  </section>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()
const error = ref(null)

// user info
const userId = computed(function(){
  return store.getters['userId']
})

// form data
const title = ref('')
const description = ref('')
const articleIsValid = ref(true)

async function submitForm(){

    if(title.value === '' || description.value === ''){
      articleIsValid.value = false
      return
    }
    articleIsValid.value = true

    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    const formData = {
        title: title.value,
        content: description.value,
        comments: '',
        likes: '',
        created_date: timestamp,
        made_by: userId.value
    }

    try{
      await store.dispatch('articles/addArticle', formData)
      router.replace('/articles')
    } catch(err){
      error.value = err.message || 'Failed to authenticate, try later.';
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
form{
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

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

input:focus,
textarea:focus{
  border-color: #4BD648;
  background-color: rgb(207, 207, 207);
  outline: none;
}
</style>