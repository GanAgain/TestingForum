<template>
  <base-dialog :show="!!error" title="Wystąpił Błąd!" @close="handleError">
      <p>{{ error }}</p>
  </base-dialog>
  <section class='document' :class="{ 'dark-mode': isDark }">
    <the-header></the-header>
    <div id="content" >
      <!-- <router-view/> -->
      <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </div>
    <the-footer></the-footer>
  </section>
</template>

<script setup>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
import { computed, ref } from "vue";
import { useStore } from 'vuex';

const store = useStore()
const error = ref(null)

// dark mode
store.dispatch('tryDarkMode')

const isDark = computed(function(){
    return store.getters['getDarkMode']
})

// user info
store.dispatch('tryLogin')

const isAuthenticated = computed(function(){
    return store.getters['isAuthenticated']
})

async function loadUserInfo(){
    try{
        if(isAuthenticated.value === true){
          await store.dispatch('users/fetchUserInfo')
        }
    } catch(err){
        error.value = err.message || 'Wystąpił Błąd!';
    }
}

loadUserInfo()

// error
function handleError(){
  error.value = null
}


</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.dark-mode{
  background-color: rgb(80, 80, 80);
  color: white;
  transition: 2s;
}

.document:not(.dark-mode) {
  background-color: white;
  color: black;
  transition: 2s;
}

#content{
  margin-top: 0;
  min-height: calc(100vh - 10rem);
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
