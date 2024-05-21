<template>
  <section>
    <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-spinner v-if="isLoading"></base-spinner>
    <base-card v-else-if="articleIsValid && !isLoading">
      <h2>{{ title }}</h2>
      <p id="articleContent">{{ content }}</p>

      <form v-if="isAuthenticated" @submit.prevent="submitForm">
        <h3>Dodaj komentarz: </h3>
        <div class="form-control">
          <textarea :class="{ 'dark-mode': isDark }"
            id="comment"
            rows="5"
            v-model.trim="comment"
          ></textarea>
        </div>
        <p v-if="!commentIsValid">Komentarz nie może być pusty!</p>
        <base-button mode="normal">Dodaj</base-button>
      </form>
      <h3>Komentarze:</h3>
      <ul>
        <li v-for="key in comments" :key="key">
          {{ creatorName(key.userId) }}
          {{ key.content }}
        </li>
      </ul>
    </base-card> 
    <h3 v-else style="text-align: center;">Taki artykuł nie istnieje!</h3>
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
const isAuthenticated = computed(function(){
    return store.getters['isAuthenticated']
})

const userId = computed(function(){
  return store.getters['userId']
})

// dark mode
const isDark = computed(function(){
    return store.getters['getDarkMode']
})

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
form{
  margin-top: 5rem;
  margin-bottom: 3rem;
}
textarea{
  width: 100%;
  padding: 5px;
  transition: 2s;
  margin-bottom: 1rem;
}
textarea.dark-mode{
  background-color: rgb(150, 150, 150);
  color: white;
}
h2{
  text-align: center;
}
h2::after {
    content: "";
    display: block;
    width: 100%;
    margin: 0.5em auto 0;
    border-bottom: 2px solid #4BD648;
}
p#articleContent{
  padding: 0 2rem;
  margin-bottom: 4rem;
}
ul {
    list-style-type: none;
}
li{
  margin: 1rem auto;
}
ul li:before {
    content: "▶";
    color: #4BD648;
    margin-right: 0.5em;
}
</style>