import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index.js'
import router from './router'
import BaseButton from './components/ui/BaseButton.vue'
import BaseCard from './components/ui/BaseCard.vue'
import BaseDialog from './components/ui/BaseDialog.vue'
import BaseSpinner from './components/ui/BaseSpinner.vue'
import { MotionPlugin } from '@vueuse/motion';
import './assets/tailwind.css'

const app = createApp(App).use(router).use(store)

const components = {
    'base-card': BaseCard,
    'base-button': BaseButton,
    'base-spinner': BaseSpinner,
    'base-dialog': BaseDialog
};

Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
});

app.use(MotionPlugin)
app.mount('#app')
