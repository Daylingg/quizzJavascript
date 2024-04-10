import { QuizQuestionApi } from '../types'

export const getCorrectAnswerIndexApi = (info: QuizQuestionApi) => {
  const correctAnswers = info.correct_answers
  let correctIndex = -1

  // Iterar sobre las claves del objeto correctAnswers
  Object.keys(correctAnswers).forEach((key, index) => {
    // Verificar si el valor de la clave es "true"
    if (correctAnswers[key] === true) {
      correctIndex = index
      return correctIndex
    }
  })
}

export const getCorrectAnswerIndex = (info: QuizQuestionApi): number => {
  const correctAnswers = info.correct_answers

  // Iterar sobre las claves del objeto correctAnswers
  for (const key in correctAnswers) {
    if (correctAnswers.hasOwnProperty(key)) {
      // Verificar si el valor de la clave es true (booleano)
      if (correctAnswers[key] === true) {
        // Extraer el índice de la clave (por ejemplo, 'answer_a_correct' -> 'a')
        const answerIndex = key.substring(key.lastIndexOf('_') + 1)
        // Convertir el índice a un número si es necesario (ejemplo: 'a' -> 0)
        console.log(answerIndex)
        return convertAnswerIndex(answerIndex)
      }
    }
  }

  // Si no se encuentra ninguna respuesta correcta, devolver -1 o manejarlo según tu lógica
  return -1
}

// Función para convertir el índice de respuesta en un número (opcional)
const convertAnswerIndex = (index: string): number => {
  // Implementa tu lógica de conversión aquí, por ejemplo:
  switch (index) {
    case 'a':
      return 0
    case 'b':
      return 1
    case 'c':
      return 2
    case 'd':
      return 3
    case 'e':
      return 4
    case 'f':
      return 5
    // Agrega más casos según sea necesario
    default:
      return -1 // Manejo de error si el índice no es reconocido
  }
}
