let timer;

export default{
    async login(context, payload){
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        })
    },
    async signup(context, payload){
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })
    },
    async auth(context, payload){
        const mode = payload.mode
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCctr4D1DF6cd56jeaW3oSpJEkm5-OmqJA';

        if (mode === 'signup') {
        url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCctr4D1DF6cd56jeaW3oSpJEkm5-OmqJA';
        }

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })

        const responseData = await response.json()

        if(!response.ok){
            const error = new Error(
                responseData.message || 'Nie udało się załozyć konta. Ten Email może być zajęty.'
            );
            throw error
        }

        if(mode === 'signup'){

            const userData = {
                role: 'USER',
                name: payload.name,
                result: ''
            }

            const response2 = await fetch(`https://testy-oprogramowania-default-rtdb.europe-west1.firebasedatabase.app/Użytkownicy/${responseData.localId}.json?auth=` +
            responseData.idToken, {
                method: 'PUT',
                body: JSON.stringify(userData)
            })

            const responseData2 = await response2.json()

            if(!response2.ok){
                const error = new Error(
                    responseData2.message || 
                    'Nie udało się zapisać uprawnień użytkownika. Skontaktuj się z administratorem witryny!'
                );
                throw error
            }
        }

        const expiresIn = +responseData.expiresIn * 1000
        const expirationDate = new Date().getTime() + expiresIn

        localStorage.setItem('token', responseData.idToken)
        localStorage.setItem('userId', responseData.localId)
        localStorage.setItem('tokenExpiration', expirationDate)

        timer = setTimeout(function() {
            context.dispatch('autoLogout');
          }, expiresIn);

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId
        })

        await context.dispatch('users/fetchUserInfo')
    },
    tryLogin(context){
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if (expiresIn < 0) {
            return;
        }

        console.log(expiresIn)
        timer = setTimeout(function() {
        context.dispatch('autoLogout');
        }, expiresIn);

        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId
            });
        }
    },
    logout(context){
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('tokenExpiration')
        localStorage.removeItem('role')

        clearTimeout(timer)

        context.commit('setUser', {
            token: null,
            userId: null
        })

        context.commit('users/setUserInfo', {
            role: null,
            name: null
        })
    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    }
}