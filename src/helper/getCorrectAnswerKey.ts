export const getCorrectAnswerKey = (answerIndex: number): string => {
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
