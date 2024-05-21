export default {
    async fetchQuestions(context){
        const response = await fetch(
            'https://testy-oprogramowania-default-rtdb.europe-west1.firebasedatabase.app/Quiz.json'
        )
        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(
                responseData.message || 'Nie udało się wczytać pytań do quizu!'
            )
            throw error
        }

        const questions = [] ;

        for (const key in responseData){
            const question = {
                id: key,
                points: responseData[key].punkty,
                correct: responseData[key].poprawna,
                question: responseData[key].pytanie,
                answers: responseData[key].odpowiedzi
            }
            questions.push(question)
        }

        // Filtering algorithm
        // const questionsByPoints = {
        //     1: questions.filter(q => q.points === 1),
        //     2: questions.filter(q => q.points === 2),
        //     3: questions.filter(q => q.points === 3)
        // };
        
        // const selectedQuestions = {
        //     1: questionsByPoints[1][Math.floor(Math.random() * questionsByPoints[1].length)],
        //     2: questionsByPoints[2][Math.floor(Math.random() * questionsByPoints[2].length)],
        //     3: questionsByPoints[3][Math.floor(Math.random() * questionsByPoints[3].length)]
        // };
        
        // const randomQuestions = Object.values(selectedQuestions).map(question => ({
        //     id: question.id,
        //     question: question.question,
        //     points: question.points,
        //     correct: question.correct,
        //     answers: question.answers
        // }));

        // Funkcja losująca dwa unikalne indeksy z tablicy o danej długości
        function getTwoUniqueRandomIndexes(length) {
            const index1 = Math.floor(Math.random() * length);
            let index2;
            do {
                index2 = Math.floor(Math.random() * length);
            } while (index1 === index2);
            return [index1, index2];
        }

        // Algorytm filtrujący
        const questionsByPoints = {
            1: questions.filter(q => q.points === 1),
            2: questions.filter(q => q.points === 2),
            3: questions.filter(q => q.points === 3)
        };

        const selectedQuestions = {
            1: (() => {
                const indexes = getTwoUniqueRandomIndexes(questionsByPoints[1].length);
                return [questionsByPoints[1][indexes[0]], questionsByPoints[1][indexes[1]]];
            })(),
            2: (() => {
                const indexes = getTwoUniqueRandomIndexes(questionsByPoints[2].length);
                return [questionsByPoints[2][indexes[0]], questionsByPoints[2][indexes[1]]];
            })(),
            3: (() => {
                const indexes = getTwoUniqueRandomIndexes(questionsByPoints[3].length);
                return [questionsByPoints[3][indexes[0]], questionsByPoints[3][indexes[1]]];
            })()
        };

        const randomQuestions = Object.values(selectedQuestions).flat().map(question => ({
            id: question.id,
            question: question.question,
            points: question.points,
            correct: question.correct,
            answers: question.answers
        }));

        context.commit('setQuestions', randomQuestions)
    },
    async addQuestion(context, payload){
        const token = context.rootGetters.token
        const response = await fetch(
            'https://testy-oprogramowania-default-rtdb.europe-west1.firebasedatabase.app/Quiz.json?auth=' +
            token,
            {
              method: 'POST',
              body: JSON.stringify(payload)
            }
        );

        const responseData = await response.json()

        if(!response.ok){
            const error = new Error(
                responseData.message || "Nie udało się dodać pytania!"
            )
            throw error
        }
    }
}