import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { type QuizQuestionApi } from './types'
//import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
//import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'

/*const getBackgroundColor = (info: QuizQuestion, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  
  if (userSelectedAnswer == null) return 'transparent' //el usuario no ha seleccionado nada

  if (index !== correctAnswer && index !== userSelectedAnswer)
    return 'transparent' //si selecciono pero la seleccion es incorrecta y no es la q el selecciono

  if (index === correctAnswer) return 'green' //si la seleccion es la correcta

  if (index === userSelectedAnswer) return 'red' //si la seleccion del usuario es la incorrecta

  return 'transparent' //si no es ninguna de las anteriores
}*/

//se crea la question
/*const Question = ({ info }: { info: QuizQuestion }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

  //creamos un handle clic donde pasamos el index...se crea una funcion q devuelve una funcion....le pasamos un parametro para q devuelva el handleclic
  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex) //se pasa el id de la pregunta y el index de la respuesta
  }

  const theme = useTheme()
  const medium = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: '#222',
        p: 2,
        textAlign: 'left',
        mt: 4,
        maxWidth: '100%',
      }}
    >
      <Typography variant={medium ? 'h5' : 'h6'}>{info.question}</Typography>

      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: '#333', maxWidth: '100%' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null} //se desactiva los botones si ya el suaurio selecciono una respuesta
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(info, index),
                width: '100%',
              }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}*/

const getBackgroundColorApi = (info: QuizQuestionApi, index: number) => {
  const { userSelectedAnswerApi, isCorrectUserAnswerApi } = info
  //getCorrectAnswerIndex(info)

  if (userSelectedAnswerApi === null) {
    return 'transparent' // Usuario no ha seleccionado ninguna respuesta
  }

  if (index !== userSelectedAnswerApi && isCorrectUserAnswerApi === false)
    return 'transparent'

  if (index === userSelectedAnswerApi && isCorrectUserAnswerApi === false)
    return 'red'

  if (index === userSelectedAnswerApi && isCorrectUserAnswerApi) return 'green'

  return 'transparent' // No se ha seleccionado esta respuesta
}

const QuestionApi = ({ info }: { info: QuizQuestionApi }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

  //creamos un handle clic donde pasamos el index...se crea una funcion q devuelve una funcion....le pasamos un parametro para q devuelva el handleclic
  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex) //se pasa el id de la pregunta y el index de la respuesta
  }

  const theme = useTheme()
  const medium = useMediaQuery(theme.breakpoints.up('md'))

  const answerKeys = Object.keys(info.answers)

  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: '#222',
        p: 2,
        textAlign: 'left',
        mt: 4,
        maxWidth: '100%',
      }}
    >
      <Typography variant={medium ? 'h5' : 'h6'}>{info.question}</Typography>

      {/* <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter> */}

      <List sx={{ bgcolor: '#333', maxWidth: '100%' }} disablePadding>
        {answerKeys.map((key, index) => {
          const answer = info.answers[key] // Obtenemos el valor de la respuesta

          return (
            <ListItem key={index} disablePadding divider>
              <ListItemButton
                disabled={info.userSelectedAnswerApi != null}
                onClick={createHandleClick(index)}
                sx={{
                  backgroundColor: getBackgroundColorApi(info, index),
                  width: '100%',
                }}
              >
                <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions) //recuperamos la question
  const questionsApi = useQuestionsStore((state) => state.questionsApi)
  const currentQuestions = useQuestionsStore((state) => state.currentQuestions) //recuperamos la pregunta actual
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion)
  const goPreviosQuestion = useQuestionsStore(
    (state) => state.goPreviosQuestion
  )

  //const questionInfo = questions[currentQuestions]
  const questionInfoApi = questionsApi[currentQuestions]

  return (
    <>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          onClick={goPreviosQuestion}
          disabled={currentQuestions === 0}
        >
          <ArrowBackIosNew />
        </IconButton>
        {/* {currentQuestions + 1}/{questions.length} */}
        {currentQuestions + 1}/{questionsApi.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestions >= questions.length - 1}
          //disabled={currentQuestions >= questionsApi.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      {/* <Question info={questionInfo} /> */}
      <QuestionApi info={questionInfoApi} />
      <Footer />
    </>
  )
}
