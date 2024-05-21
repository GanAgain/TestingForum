export default {
    async fetchUserInfo(context){
        const userId = context.rootGetters.userId
        if(!userId){
            return
        }
        const response = await fetch(
            `https://testy-oprogramowania-default-rtdb.europe-west1.firebasedatabase.app/Użytkownicy/${userId}.json`
        )
        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(
                responseData.message || 
                'nie załadowano informacji o użytkowniku!'
            )
            throw error
        }
        context.commit('setUserInfo', responseData)
        localStorage.setItem('role', responseData.role)
    },
    async changeUserResult(context, payload){
        const token = context.rootGetters.token
        const userId = context.rootGetters.userId
        const response = await fetch(
            `https://testy-oprogramowania-default-rtdb.europe-west1.firebasedatabase.app/Użytkownicy/${userId}/result.json?auth=` +
            token,
            {
                method: 'PUT',
                body: JSON.stringify(payload)
            }
        )
        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(
                responseData.message || 
                'nie udało się ustawić wyniku!'
            )
            throw error
        }
        context.dispatch('fetchUserInfo')
    },
    async fetchUsersNames(context){
        const response = await fetch(
            `https://testy-oprogramowania-default-rtdb.europe-west1.firebasedatabase.app/Użytkownicy.json`
        )
        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(
                responseData.message || 'Nie udało się wczytać nazw użytkowników!'
            )
            throw error
        }

        const usersNames = [] ;

        for (const key in responseData){
            const user = {
                id: key,
                name: responseData[key].name
            }
            usersNames.push(user)
        }

        context.commit('setUsersNames', usersNames)
    }
}