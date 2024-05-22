<template>
  <section class="pt-8">
    <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card mode="auth">
      <h2 class="text-center text-2xl">Utwórz artykuł</h2>
      <form @submit.prevent="submitForm" class="max-w-3xl mx-auto">
        <div class="form-control">
          <label for="title">Tytuł</label>
          <input
            type="text"
            id="title"
            v-model.trim="title"
            class="border-2 border-gray-300 rounded-md p-2 w-full text-black focus:border-green-500"
          />
        </div>
        <div class="form-control mt-3">
          <label for="description">Treść</label>
          <textarea
            id="description"
            rows="10"
            v-model.trim="description"
            class="border-2 border-gray-300 rounded-md p-2 w-full text-black focus:border-green-500"
          ></textarea>
        </div>
        <p v-if="!articleIsValid" class="text-red-500">Tytuł i treść nie mogą być puste!</p>
        <base-button mode="normal" class="mt-4">Dodaj artykuł</base-button>
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
