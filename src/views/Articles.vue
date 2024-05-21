<template>
    <section>
        <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
        <p>{{ error }}</p>
        </base-dialog>
        <section>
            <base-spinner v-if="isLoading"></base-spinner>
            <ul v-else-if="articlesExist && !isLoading">
                <ArticleItem
                    v-for="article in articles"
                    :key="article.id"
                    :article="article"
                />
            </ul>
            <h3 v-else style="text-align: center;">Brak Artykułów!</h3>
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
const articlesExist = computed(function(){
    return store.getters['articles/articlesExist']
})

async function loadArticles(){
    isLoading.value = true
    try{
        await store.dispatch('articles/fetchArticles')
    } catch(err){
        error.value = err.message || 'Nie udało się załadować artykułów!';
    }
    isLoading.value = false
}

const articles = computed(function(){
    return store.getters['articles/articles']
})

loadArticles()

// users names
async function loadUsersNames(){
    try{
        await store.dispatch('users/fetchUsersNames')
    } catch(err){
        error.value = err.message || 'Nie udało się załadować nazw użytkowników!';
    }
}

loadUsersNames()

// error
function handleError(){
  error.value = null
}

</script>

<style scoped>
ul{
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 60%;
}
</style>