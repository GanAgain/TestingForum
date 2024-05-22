<template>
    <section>
      <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
        <p>{{ error }}</p>
      </base-dialog>
      <section>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul
          v-else-if="articlesExist && !isLoading"
          class="flex-wrap mx-auto justify-center list-none m-8 p-0 max-w-4xl"
        >
          <ArticleItem
            v-for="article in articles"
            :key="article.id"
            :article="article"
            class="m-2"
          />
        </ul>
        <h3 v-else class="text-center">Brak Artykułów!</h3>
      </section>
    </section>
  </template>
  
  <script setup>
  import { useStore } from 'vuex';
  import { computed, ref } from 'vue';
  import ArticleItem from '../components/article/ArticleItem.vue';
  
  const store = useStore()
  const error = ref(null)
  const isLoading = ref(false)
  
  // articles
  const articlesExist = computed(() => store.getters['articles/articlesExist'])
  
  async function loadArticles() {
    isLoading.value = true;
    try {
      await store.dispatch('articles/fetchArticles');
    } catch (err) {
      error.value = err.message || 'Nie udało się załadować artykułów!';
    }
    isLoading.value = false;
  }
  
  const articles = computed(() => store.getters['articles/articles']);
  
  loadArticles();
  
  // users names
  async function loadUsersNames() {
    try {
      await store.dispatch('users/fetchUsersNames');
    } catch (err) {
      error.value = err.message || 'Nie udało się załadować nazw użytkowników!';
    }
  }
  
  loadUsersNames();
  
  // error
  function handleError() {
    error.value = null;
  }
  </script>
  