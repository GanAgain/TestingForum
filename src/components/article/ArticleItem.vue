<template>
  <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
      <p>{{ error }}</p>
  </base-dialog>
  <li :class="['rounded-2xl p-8 my-4 transition-colors duration-2000', isDark ? 'border border-gray-400' : 'border border-gray-800']" v-motion-slide-visible-once-right>
    <div id="top" class="flex justify-between">
      <h2 class="m-0 text-2xl font-bold">{{ article.title }}</h2>
      <div id="info" :class="['text-right', isDark ? 'text-gray-400' : 'text-gray-500']">
        <p class="m-0">{{ formattedDate }}</p>
        <p class="m-0">{{ creatorName }}</p>
      </div>
    </div>
    <div id="article" class="p-8">
      {{ truncateContent(article.content, 1) }}
    </div>
    <div id="options" class="flex justify-around items-center m-0">
      <div class="flex items-center">
        <i class="fas fa-thumbs-up cursor-pointer text-xl" @click="likeArticle" :class="{ 'text-project-green': isLiked }"></i>
        <p class="px-4">{{ likesLength }}</p>
      </div>
      <p>Komentarze: {{ commentsLength }}</p>
      <router-link :to="articleDetailsLink" class="text-project-green font-bold no-underline">Czytaj więcej >></router-link>
    </div>
  </li>
</template>

<script setup>
import { useStore } from 'vuex';
import { defineProps, ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const store = useStore();
const error = ref('');
const route = useRoute();

const props = defineProps({
  article: Object
});

const articleDetailsLink = computed(() => `${route.path}/${props.article.id}`);

// user info
const isAuthenticated = computed(() => store.getters['isAuthenticated']);
const userId = computed(() => store.getters['userId']);

// dark mode
const isDark = computed(() => store.getters['getDarkMode']);

// likes
const likesLength = computed(() => Object.keys(props.article.likes).length);
const isLiked = computed(() => isAuthenticated.value && Object.values(props.article.likes).includes(userId.value));

async function likeArticle() {
    try {
        await store.dispatch('articles/likeArticle', props.article);
    } catch (err) {
        error.value = err.message || 'Nie udało się polubić artykułu!';
    }
}

// info
const creatorName = computed(() => store.getters['users/usersNames'].find(user => user.id === props.article.made_by)?.name);

const dateOfCreation = new Date(props.article.created_date);
const formattedDate = `${dateOfCreation.getDate()}/${dateOfCreation.getMonth() + 1}/${dateOfCreation.getFullYear()} ${dateOfCreation.getHours()}:${dateOfCreation.getMinutes()}`;

// comments
const commentsLength = computed(() => Object.keys(props.article.comments).length);

// content
const truncateContent = (content, lines) => {
  const textLines = content.split('\n');
  if (textLines.length <= lines) return content;
  return `${textLines.slice(0, lines).join('\n')}...`;
}

// error
function handleError() {
  error.value = null;
}
</script>