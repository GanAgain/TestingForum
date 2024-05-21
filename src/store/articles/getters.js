export default {
    articles(state){
        return state.articles
    },
    articlesExist(_, getters){
        return getters.articles && getters.articles.length > 0;
    }
}