export interface QuizQuestion {
  id: number
  question: string
  code: string
  answers: string[]
  correctAnswer: number
  userSelectedAnswer?: number
  isCorrectUserAnswer?: boolean
}

export interface QuizQuestionApi {
  id: number
  question: string
  description: string | null
  answers: Record<string, string | null> // Claves dinámicas para respuestas
  /* {
    answer_a: string | null
    answer_b: string | null
    answer_c: string | null
    answer_d: string | null
    answer_e: string | null
    answer_f: string | null
  }*/
  multiple_correct_answers: boolean
  correct_answers: Record<string, boolean> // Claves dinámicas para respuestas correctas
  /*{
    answer_a_correct: boolean
    answer_b_correct: boolean
    answer_c_correct: boolean
    answer_d_correct: boolean
    answer_e_correct: boolean
    answer_f_correct: boolean
  }*/
  correct_answer: string
  explanation: string | null
  tip: string | null
  tags: { name: string }[]
  category: string
  difficulty: string
  userSelectedAnswerApi?: number
  isCorrectUserAnswerApi?: boolean
}
