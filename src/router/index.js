import { createRouter, createWebHistory } from 'vue-router'
import ArticleDetails from '@/views/ArticleDetails.vue'
import Articles from '@/views/Articles.vue'
import Auth from '@/views/Auth.vue'
import Quiz from '@/views/Quiz.vue'
import Tests from '@/views/Tests.vue'
import NotFound from '@/views/NotFound.vue'
import CreateArticle from '@/views/CreateArticle.vue'
import CreateQuestion from '@/views/CreateQuestion.vue'
import store from '../store/index.js';

const routes = [
  { path: '/', redirect: '/articles' },
  { path: '/articles', name: 'articles', component: Articles },
  { path: '/create', name: 'create', component: CreateArticle, meta: { requiresAdmin: true } },
  { path: '/articles/:articleId', name: 'article-details', component: ArticleDetails, props: true },
  { path: '/quiz', name: 'quiz', component: Quiz, meta: { requiresAuth: true }},
  { path: '/quiz/create', name: 'createQuestion', component: CreateQuestion, meta: { requiresAdmin: true }},
  { path: '/tests', name: 'tests', component: Tests },
  { path: '/auth', name: 'auth', component: Auth, meta: { requiresUnauth: true } },
  { path: '/:notFound(.*)', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(function(to, _, next){
  if(to.meta.requiresAuth && !store.getters.isAuthenticated){
    next('/auth')
  } else if (to.meta.requiresAdmin && localStorage.getItem('role')!=='ADMIN' && store.getters.isAuthenticated) {
    next('/articles')
  } else if (to.meta.requiresAdmin && localStorage.getItem('role')!=='ADMIN' && !store.getters.isAuthenticated){
    next('/auth')
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated){
    next('/articles')
  } else {
    next();
  }
})

export default router
