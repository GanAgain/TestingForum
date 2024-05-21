export default{
    addArticle(state, payload){
        state.articles.push(payload)
    },
    setArticles(state, payload){
        state.articles = payload
    },
}