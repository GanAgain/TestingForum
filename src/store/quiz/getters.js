export default{
    questions(state){
        return state.questions
    },
    questionsExist(_, getters){
        return getters.questions && getters.questions.length > 0;
    }
}