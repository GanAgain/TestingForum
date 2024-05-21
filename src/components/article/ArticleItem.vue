<template>
  <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
      <p>{{ error }}</p>
  </base-dialog>
  <li :class="{ 'dark-mode': isDark }" v-motion-slide-visible-once-right>
    <div id="top">
      <h2>{{ article.title }}</h2>
      <div id="info">
        <p>{{ formattedDate }}</p>
        <p>{{ creatorName }}</p>
      </div>
    </div>
    <div id="article">
      {{ truncateContent(article.content, 1) }}
    </div>
    <div id="options">
      <div>
        <i class="fas fa-thumbs-up" @click="likeArticle" :style="{ color: isLiked ? '#4BD648' : '' }"></i>
        <p>{{ likesLength }}</p>
      </div>
      <p>Komentarze: {{ commentsLength }}</p>
      <router-link :to="articleDetailsLink">Czytaj więcej >></router-link>
    </div>
  </li>
</template>

<script setup>
import { useStore } from 'vuex';
import { defineProps, ref } from 'vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const store = useStore()
const error = ref('')
const route = useRoute()

const props = defineProps({
  article: Object
})

const articleDetailsLink = computed(function (){
  return route.path + '/' + props.article.id
})

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

// likes
const likesLength = computed(function(){
  return Object.keys(props.article.likes).length
})

const isLiked = computed(function(){
  if (isAuthenticated) {
    return Object.values(props.article.likes).includes(userId.value);
  } else {
    return false;
  }
});

async function likeArticle(){
    try{
        await store.dispatch('articles/likeArticle', props.article)
    } catch(err){
        error = err.message || 'Nie udało się polubić artykułu!';
    }
}

// info
const creatorName = computed(function(){
  return store.getters['users/usersNames'].find(user => user.id === props.article.made_by)?.name;
})

const dateOfCreation = new Date(props.article.created_date);

const day = dateOfCreation.getDate();
const month = dateOfCreation.getMonth() + 1; // Add 1, to get the proper month (not from 0 to 11)
const year = dateOfCreation.getFullYear();
const hours = dateOfCreation.getHours();
const minutes = dateOfCreation.getMinutes();

const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

// comments
const commentsLength = computed(function(){
  return Object.keys(props.article.comments).length
})

// content
const truncateContent = (content, lines) => {
  const textLines = content.split('\n');
  if (textLines.length <= lines) return content;
  return textLines.slice(0, lines).join('\n') + '...';
}

// error
function handleError(){
  error.value = null
}
</script>

<style scoped>
li{
  margin: 1rem 0;
  padding: 2rem;
  border-radius: 25px;
}
li.dark-mode{
  border: 1px solid rgb(177, 177, 177);
  transition: 2s;
}
li:not(.dark-mode) {
  border: 1px solid rgb(66, 66, 66);
  transition: 2s;
}
#top{
  display: flex;
  justify-content: space-between;
}
h2{
  margin: 0;
}
#info{
  margin: 0;
  color: grey;
  text-align: right;
  transition: 2s;
}
li.dark-mode #top #info{
  color: lightgray;
}
li:not(.dark-mode) #top #info{
  color: grey;
}
#info p {
  margin: 0;
}
#article{
  padding: 2rem;
}
#options{
  display: flex;
  justify-content: space-around;
  margin: 0;
  align-items: center;
}
#options div {
  display: flex;
  align-items: center;
}
#options div i,
#options div p{
  padding: 0 10%;
}
.fa-thumbs-up{
  cursor: pointer;
  font-size: 1.2rem;
}
a{
  text-decoration: none;
  color:  #4BD648;
  font-weight: bold;
}
</style>