<template>
  <section>
    <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-spinner v-if="isLoading"></base-spinner>
    <base-card v-else-if="articleIsValid && !isLoading">
      <h2 class="text-center text-2xl">{{ title }}</h2>
      <p id="articleContent" class="px-8 mb-6">{{ content }}</p>

      <form v-if="isAuthenticated" @submit.prevent="submitForm" class="mt-20 mb-12">
        <h3 class="mb-2">Dodaj komentarz:</h3>
        <div class="form-control">
          <textarea :class="{ 'dark-mode': isDark }"
            id="comment"
            rows="5"
            v-model.trim="comment"
            class="w-full p-2 transition duration-500"
          ></textarea>
        </div>
        <p v-if="!commentIsValid" class="text-red-500">Komentarz nie może być pusty!</p>
        <base-button mode="normal" class="mt-4">Dodaj</base-button>
      </form>
      <h3 class="mb-4 text-xl">Komentarze:</h3>
      <ul>
        <li v-for="key in comments" :key="key" class="mb-4">
          {{ creatorName(key.userId) }}:
          {{ key.content }}
        </li>
      </ul>
    </base-card> 
    <h3 v-else class="text-center">Taki artykuł nie istnieje!</h3>
  </section>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const error = ref(null)
const isLoading = ref(false)
const props = defineProps(['articleId'])

// user info
const isAuthenticated = computed(() => store.getters['isAuthenticated'])
const userId = computed(() => store.getters['userId'])

// dark mode
const isDark = computed(() => store.getters['getDarkMode'])

// article details
const articleIsValid = ref(true)
const title = ref('')
const content = ref('')
const comments = ref('')

async function getSelected(){
    isLoading.value = true
    await store.dispatch('articles/fetchArticles');
    const art = await store.getters['articles/articles'].find(
      (article) => article.id === props.articleId
    )
    isLoading.value = false
    if(art){
      title.value = art.title
      content.value = art.content
      comments.value = art.comments
    }
    else{
      articleIsValid.value = false
    }
}

getSelected()

// comment data
const comment = ref('')
const commentIsValid = ref(true)

const creatorName = computed(() => {
    store.dispatch('users/fetchUsersNames')
    return (id) => {
      const user = store.getters['users/usersNames'].find(user => user.id === id);
      return user ? user.name : 'Nieznany';
}})

async function submitForm(){
    if (comment.value === ''){
      commentIsValid.value = false
      return
    }
    const commentData = {
      content: comment.value,
      userId: userId,
      articleId: props.articleId
    }
    try{
        await store.dispatch('articles/commentArticle', commentData)
    } catch(err){
        error.value = err.message || 'Nie udało się dodać komentarza, wystąpił błąd!';
    }
}

// error
function handleError(){
  error.value = null
}

</script>

<style scoped>
h2::after {
    content: "";
    display: block;
    width: 100%;
    margin: 1em auto 0.5em;
    border-bottom: 2px solid #4BD648;
}
ul {
    list-style-type: none;
}
li {
  margin: 1rem auto;
}
ul li:before {
    content: "▶";
    color: #4BD648; /* zmiana koloru strzałek na zielony */
    margin-right: 0.5em;
    font-family: Arial, sans-serif; 
}
</style>
