<template>
  <section>
    <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <h2 class="text-2xl">Demonstracja działania automatycznych testów przeglądarkowych przy użyciu Selenium</h2>
      <p class="pb-10">W celu ułatwienia lepszego zrozumienia chociaż części z rodzajów testów oprogramowania, napisałem kilka przykładowych testów automatycznych, 
        przy użyciu biblioteki Selenium.  
      </p>
      <h3 class="text-xl">Czym dokładnie jest Selenium?</h3>
      <p class="pb-10">Selenium jest zestawem narzędzi do automatyzacji przeglądarek internetowych. Umożliwia programistom pisanie skryptów testowych, które symulują działania użytkownika w przeglądarkach,
         takie jak klikanie przycisków, wypełnianie formularzy, nawigowanie po stronach, itp.
      </p>
      <h3 class="text-xl">Jakie testy oprogramowania możemy wykonać przy użyciu tego narzędzia?</h3>
      <ul class="pb-10">
        <li><span class="font-bold">Testy funkcjonalne</span> - Sprawdzają, czy funkcjonalności aplikacji działają zgodnie z wymaganiami.</li>
        <li><span class="font-bold">Testy end-to-end </span> - Testują cały przepływ aplikacji od początku do końca, aby upewnić się, że wszystkie komponenty współpracują ze sobą poprawnie.</li>
        <li><span class="font-bold">Testy regresji </span> - Sprawdzają, czy nowe zmiany w kodzie nie wprowadziły błędów w już istniejących funkcjonalnościach.</li>
        <li><span class="font-bold">Testy interfejsu </span> użytkownika - Sprawdzają wygląd i zachowanie elementów interfejsu użytkownika.</li>
        <li><span class="font-bold">Testy przeglądarkowe </span> - Sprawdzają, czy aplikacja działa poprawnie w różnych przeglądarkach.</li>
      </ul>
      <h3 class="text-xl">Zobacz jak działają testy!</h3>
      <p class="pb-10">Są one dostępne do pobrania po wciśnięciu przycisku "Pobierz Testy". Poniżej zamieszczam także krótką instrukcję, jak możemy je uruchomić na naszym komputerze. </p>
      <base-button mode="normal"><a href="/demonstrationTests.zip" download="demonstrationTests.zip">Pobierz Testy</a></base-button>
      <h3 class="text-xl">Jak uruchomić testy?</h3>
      <p>Po zainstalowaniu paczki, musimy wykonać następujące czynności:</p>
      <ol>
        <li>Instalacja języka Python3 - możemy zrobić to na oficjalnej stronie twórców tego języka</li>
        <li>Instalacja Narzędzi Selenium, Pytest, Pytest-html. W terminalu, w lokalizacji nadrzędnej testów wykonujemy te 3 komendy:
          <ul>
            <li>pip install selenium</li>
            <li>pip install pytest</li>
            <li>pip install pytest-html</li>
          </ul>
        </li>
        <li>Po ukończonej instalacji możemy uruchomić testy. Do tego celu w katalogu 'tests' używamy komendy <span class="font-bold">pytest</span>.</li>
      </ol>
    </base-card> 
  </section>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const error = ref(null)

// dark mode
const isDark = computed(() => store.getters['getDarkMode'])

// article details
const articleIsValid = ref(true)
const title = ref('')
const content = ref('')
const comments = ref('')

// comment data
const comment = ref('')
const commentIsValid = ref(true)


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
h3::after {
    content: "";
    display: block;
    width: 100%;
    margin: 1em auto 0.5em;
    border-bottom:1px solid #4BD648;
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
