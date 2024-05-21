import router from "@/router";

export default {
    async fetchArticles(context){
        const response = await fetch(
            'https://testy-oprogramowania-default-rtdb.europe-west1.firebasedatabase.app/Artykuły.json'
        )
        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(
                responseData.message || 'Nie udało się załadować artykułów!'
            )
            throw error
        }

        const articles = [] ;

        for (const key in responseData){
            const article = {
                id: key,
                title: responseData[key].title,
                content: responseData[key].content,
                likes: responseData[key].likes,
                made_by: responseData[key].made_by,
                comments: responseData[key].comments,
                created_date: responseData[key].created_date
            }
            articles.push(article)
        }

        context.commit('setArticles', articles)
    },
    async addArticle(context, payload){
        const token = context.rootGetters.token;
        const response = await fetch(
            'https://testy-oprogramowania-default-rtdb.europe-west1.firebasedatabase.app/Artykuły.json?auth=' +
            token,
            {
              method: 'POST',
              body: JSON.stringify(payload)
            }
        );

        const responseData = await response.json()

        if(!response.ok){
            const error = new Error(
                responseData.message || "Nie udało się dodać artykułu!"
            )
            throw error
        }
    },
    async likeArticle(context, payload){
        const articleId = payload.id
        const userId = context.rootGetters.userId
        const token = context.rootGetters.token;

        if(!userId){
            router.push('/auth')
            return
        }

        const likesValues = Object.values(payload.likes);
        const isLiked = likesValues.includes(userId);
        let likeKey = ''

        if(isLiked){
            for (let key in payload.likes) {
                if (payload.likes[key] === userId) {
                    likeKey = key
                    break;
                }
            }

            let response 
            if(Object.keys(payload.likes).length === 1){
                response = await fetch(
                    `https://testy-oprogramowania-default-rtdb.europe-west1.firebasedatabase.app/Artykuły/${articleId}/likes.json?auth=` +
                    token,
                    {
                      method: 'PUT',
                      body: JSON.stringify('') // Key value update to empty
                    }
                  );
            }
            else{
                response = await fetch(
                    `https://testy-oprogramowania-default-rtdb.europe-west1.firebasedatabase.app/Artykuły/${articleId}/likes/${likeKey}.json?auth=` +
                    token,
                    {
                      method: 'DELETE'
                    }
                  );
            }

            const responseData = await response.json()

            if(!response.ok){
                const error = new Error(
                    responseData.message || "Nie udało się cofnąć polubienia artykułu!"
                )
                throw error
            }
        }
        else{
            const response = await fetch(
                `https://testy-oprogramowania-default-rtdb.europe-west1.firebasedatabase.app/Artykuły/${articleId}/likes.json?auth=` +
                token,
                {
                  method: 'POST',
                  body: JSON.stringify(userId)
                }
            );
    
            const responseData = await response.json()
    
            if(!response.ok){
                const error = new Error(
                    responseData.message || "Nie udało się polubić artykułu!"
                )
                throw error
            } 
        }
        context.dispatch('fetchArticles')      
    },
    async commentArticle(context, payload){
        const token = context.rootGetters.token;
        const articleId = payload.articleId
        const commentData = {
            content: payload.content,
            userId: context.rootGetters.userId
        }

        const response = await fetch(
            `https://testy-oprogramowania-default-rtdb.europe-west1.firebasedatabase.app/Artykuły/${articleId}/comments.json?auth=` +
            token,
            {
              method: 'POST',
              body: JSON.stringify(commentData)
            }
        );
        const responseData = await response.json()

        if(!response.ok){
            const error = new Error(
                responseData.message || "Nie udało się dodać komentarza!"
            )
            throw error
        }
    }
}