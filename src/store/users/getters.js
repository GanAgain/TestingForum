export default{
    userInfo(state){
        return state.users
    },
    isAdmin(state){
        return state.users.role === 'ADMIN'
    },
    usersNames(state){
        return state.usersNames
    }
}