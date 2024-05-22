<template>
  <header class="w-full bg-project-green py-2 min-h-16">
    <nav class="container mx-auto flex flex-wrap justify-between items-center">
      <ul class="flex space-x-6">
        <li>
          <router-link to="/articles" class="text-white hover:text-gray-700">
            Artykuły
          </router-link>
        </li>
        <li v-if="isAuthenticated">
          <router-link to="/quiz" class="text-white hover:text-gray-700">
            Quiz
          </router-link>
        </li>
        <li>
          <router-link to="/tests" class="text-white hover:text-gray-700">
            Testy
          </router-link>
        </li>
        <li v-if="isAdmin">
          <router-link to="/create" class="text-white hover:text-gray-700">
            Utwórz Artykuł
          </router-link>
        </li>
        <li v-if="isAdmin">
          <router-link to="/quiz/create" class="text-white hover:text-gray-700">
            Utwórz Pytania do Quizu
          </router-link>
        </li>
        <li v-if="!isAuthenticated">
          <router-link to="/auth" class="text-white hover:text-gray-700">
            Zaloguj się
          </router-link>
        </li>
        <li v-else>
          <p @click="logout" class="text-white cursor-pointer hover:text-gray-700">
            Wyloguj się
          </p>
        </li>
        <li>
          <p @click="changeDarkMode" class="text-white cursor-pointer hover:text-gray-700">
            Dark Mode
          </p>
        </li>
      </ul>
      <p v-if="isAuthenticated" class="text-white mt-4 md:mt-0">
        Witaj, {{ userName }}
      </p>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const router = useRouter()

// dark mode
function changeDarkMode(){
  store.dispatch('changeDarkMode')
}

// user info
const isAuthenticated = computed(function(){
    return store.getters['isAuthenticated']
})

const isAdmin = computed(function(){
    return store.getters['users/isAdmin']
})

const userName = computed(function(){
    return store.getters['users/userInfo'].name
})

function logout(){
  store.dispatch('logout')
  router.replace('/articles')
}

</script>

<style scoped>
header {
  font-size: 1.4rem;
}

nav ul li {
  padding: 8px 12px; /* Dodany padding od góry i dołu */
}

nav ul li a.router-link-exact-active {
  color: #696969; /* Kolor czcionki dla zaznaczonego elementu */
}

@media (max-width: 768px) {
  header {
    font-size: 1rem; /* Zmniejszona wielkość czcionki dla linków na mniejszych ekranach */
  }
  nav ul li {
    margin: 0.5rem;
  }
}
@media (max-width: 992px) {
  header {
    font-size: 1.2rem; /* Zmniejszona wielkość czcionki dla linków na mniejszych ekranach */
  }
}
@media (min-width: 1350px) {
  header {
    height: 4rem; /* Zmniejszona wielkość czcionki dla linków na mniejszych ekranach */
  }
}
</style>
