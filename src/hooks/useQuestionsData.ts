import { useQuestionsStore } from '../store/questions'

export const useQuestionsData = () => {
  const questions = useQuestionsStore((state) => state.questions)

  let corrects = 0
  let incorrect = 0
  let unanswer = 0

  questions.forEach((question) => {
    //en cada question decimos
    const { userSelectedAnswer, correctAnswer } = question

    if (userSelectedAnswer == null)
      unanswer++ //si userSelectedAnswer es null no ha sido contestada...  aumentamos las no respondidas
    else if (userSelectedAnswer === correctAnswer)
      corrects++ //si la seleccionada por el usuario es la correcta aumentamos la correcta
    else incorrect++ //si la seleccionada es distinta de la correca aumentamos las incorrectas
  })

  return { corrects, incorrect, unanswer }
}
