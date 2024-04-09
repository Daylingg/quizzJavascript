import { Container, Stack, Typography, useTheme } from '@mui/material'
import './App.css'
import { Game } from './Game'
import { useQuestionsData } from './hooks/useQuestionsData'
import { JavaScriptLogo } from './JavaScriptLogo'
import { Results } from './Results'
import { Start } from './Start'
import { useQuestionsStore } from './store/questions'
import useMediaQuery from '@mui/material/useMediaQuery'

function App() {
  const questions = useQuestionsStore((state) => state.questions)
  const { unanswer } = useQuestionsData()
  const theme = useTheme()

  const medium = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <main>
      {/* Typography es para q renderice un h1 como si fuera un h2 
      Stack es para apilar elementos en alguna direccion en row o collum*/}
      <Container maxWidth="sm">
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <JavaScriptLogo />
          <Typography variant={medium ? 'h2' : 'h5'} component="h1">
            JavaScript Quiz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && unanswer > 0 && <Game />}
        {questions.length > 0 && unanswer === 0 && <Results />}
      </Container>
    </main>
  )
}

export default App
