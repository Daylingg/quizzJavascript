import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware' //para lograr la persistencia de los datos con el local store
import { QuizQuestion, QuizQuestionApi } from '../types'
import confetti from 'canvas-confetti'
//import { data } from '../data'
import { obtQuestionsApi } from '../services/obtQuestions'

const getCorrectAnswerKey = (answerIndex: number): string => {
  const answerKeys = [
    'answer_a',
    'answer_b',
    'answer_c',
    'answer_d',
    'answer_e',
    'answer_f',
  ]
  return `${answerKeys[answerIndex]}_correct`
}

//tipamos el estado...el estado va a tener dos propiedades y un metodo
interface State {
  questions: QuizQuestion[]
  questionsApi: QuizQuestionApi[] //arreglo de questions
  currentQuestions: number //pregunta en la q esta el usuario
  fetchQuestions: (limit: number) => Promise<void> //metodo de tipo promesa
  selectAnswer: (questionId: number, answerIndex: number) => void //met q devuelve de esta pregunta con esta id marcas esta solucion con este indice...es para cuando el usuario da clic en una respuesta
  goNextQuestion: () => void
  goPreviosQuestion: () => void
  reset: () => void
}

//el useQuestions es de tipo state q creamos encima...el create va a recibir un callback y ahi se devuelve el estado global
export const useQuestionsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        //se crea el estado con un set para actualizar el estado y el get para leer info del estado
        return {
          loading: false,
          questions: [],
          questionsApi: [],
          currentQuestions: 0, //posicion del array de questions
          fetchQuestions: async (limit: number) => {
            //recuperamos de una api...en este caso de localhost y hacemos un fetch
            /*const res = await fetch('http://localhost:5173/data.json')
            const json = await res.json() //convertimos la respuesta en json

            //json.sort(() => Math.random() - 0.5) de esta manera lo desordena y esto .slice(0, limit) para limitar el numero al q se le pasa por parametro
            const questions = json
              .sort(() => Math.random() - 0.5)
              .slice(0, limit)*/

            const questionsApi = await obtQuestionsApi(
              ` https://quizapi.io/api/v1/questions?limit=${limit}&tags=Javascript&category=Code&difficulty=easy`
            )

            //este caso es cuando tenemos los datos en un archivo de nuestro proyecto
            /*const questions = data
              .sort(() => Math.random() - 0.5)
              .slice(0, limit)*/

            //actualiza el estado global con lo q hay en el set
            //set({ questions }, false, 'fetch_questions') //para q en las dev tools del navegador salga con un nombre las acciones
            set({ questionsApi }, false, 'fetch_questions_api')
          },
          selectAnswer: (questionId: number, answerIndex: number) => {
            //const { questions } = get() //con el get obtenemos el estado ...en este caso queremos el questions para usarlo en el structureClone
            const { questionsApi } = get()
            //usamos el structureClone para clonar el obj de forma profunda
            //const newQuestions = structuredClone(questions) //se clonan las preguntas pero solo cambiamos la q necesitamos
            const newQuestionsApi = structuredClone(questionsApi)

            //como no tenemos el indice pq estan desordenadas se busca segun el id para obtener el indice
            //encuentra la pregunta q la id sea igual a la id pasada
            // const questionIndex = newQuestions.findIndex(
            //   (q: any) => q.id === questionId
            // )
            const questionIndexApi = newQuestionsApi.findIndex(
              (q: any) => q.id === questionId
            )

            //obtenemos la informacion de la pregunta
            // questionInfo = newQuestions[questionIndex]
            const questionInfoApi = newQuestionsApi[questionIndexApi]

            // Verificar si la respuesta seleccionada por el usuario es correcta
            const correctAnswerKey = getCorrectAnswerKey(answerIndex) //se obt la respuesta q selecciono el usuario

            const isCorrectUserAnswerApi =
              questionInfoApi.correct_answers[correctAnswerKey] === true

            if (isCorrectUserAnswerApi) {
              confetti()
            }

            newQuestionsApi[questionIndexApi] = {
              ...questionInfoApi, //tiene toda la informacion de la preguntsa y ademas se añade
              isCorrectUserAnswerApi, //si es correcta la respuesta
              userSelectedAnswerApi: answerIndex, //y la pregunta q selecciono el usuario
            }
            set({ questionsApi: newQuestionsApi }, false, 'select_answer_api')

            //averiguamos si el usuario ha seleccionado la respuesta correcta
            /* const isCorrectUserAnswer =
              questionInfo.correctAnswer === answerIndex

            if (isCorrectUserAnswer) confetti()

            //cambiamos la informacion en la copia q hemos echo de la pregunta
            newQuestions[questionIndex] = {
              ...questionInfo, //tiene toda la informacion de la preguntsa y ademas se añade
              isCorrectUserAnswer, //si es correcta la respuesta
              userSelectedAnswer: answerIndex, //y la pregunta q selecciono el usuario
            }

            set({ questions: newQuestions }, false, 'select_answer')*/
          },

          goNextQuestion: () => {
            const { currentQuestions, questions } = get() //obtenemos la pregunta actual y las preguntas q hay
            const nextQuestion = currentQuestions + 1

            if (nextQuestion < questions.length) {
              //si la proxima pregunta esta por debajo de la cant de preguntas
              set({ currentQuestions: nextQuestion }, false, 'go_next_question') //actualizamos la pregunta actual
            }
          },

          goPreviosQuestion: () => {
            const { currentQuestions } = get() //obtenemos la pregunta actual
            const previosQuestion = currentQuestions - 1

            if (previosQuestion >= 0) {
              //si la pregunta anterior es mayor q cero
              set(
                { currentQuestions: previosQuestion },
                false,
                'go_previos_question'
              ) //actualizamos la pregunta actual
            }
          },

          reset: () => {
            set(
              { currentQuestions: 0, questions: [], questionsApi: [] },
              false,
              'reset'
            )
          },
        }
      },
      {
        name: 'questions',
      }
    )
  )
)
