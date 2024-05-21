<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/articles">Artykuły</router-link>
        </li>
        <li>
          <router-link v-if="isAuthenticated" to="/quiz">Quiz</router-link>
        </li>
        <li>
          <router-link to="/tests">Testy</router-link>
        </li>
        <li v-if="isAdmin">
          <router-link to="/create">Utwórz Artykuł</router-link>
        </li>
        <li v-if="isAdmin">
          <router-link to="/quiz/create">Utwórz Pytania do Quizu</router-link>
        </li>
        <li v-if="!isAuthenticated">
          <router-link to="/auth">Zaloguj się</router-link>
        </li>
        <li v-else>
          <p @click="logout">Wyloguj się</p>
        </li>
        <li>
          <p @click="changeDarkMode">Dark Mode</p>
        </li>
      </ul>
      <p v-if="isAuthenticated" class="welcome">
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
  width: 100%;
  background-color: #4BD648;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
}

header a,
p {
  text-decoration: none;
  color: #ffffff;
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
}
h1 a,
p {
  color: white;
  margin: 0.5rem 0;
}
a:active,
a:hover,
a.router-link-active,
p:hover {
  border-color: transparent;
  color: #696969;
  cursor: pointer;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

li {
  margin: 0.5rem;
}

.welcome {
  margin-left: auto;
}

.welcome:hover {
  color: white;
  cursor: default;
}

@media (max-width: 768px) {
  header {
    font-size: 1.2rem;
  }

  header nav {
    flex-direction: column;
  }

  header ul {
    flex-direction: column;
  }

  li {
    margin: 0.25rem 0;
  }

  .welcome {
    margin-left: 0;
    margin-top: 0.5rem;
  }
}

@media (max-width: 480px) {
  header {
    font-size: 1rem;
    padding: 0.25rem 0;
  }

  header a,
  p {
    padding: 0.25rem 0.5rem;
  }
}
</style>
