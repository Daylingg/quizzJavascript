import { Button } from '@mui/material'
import { useQuestionsData } from './hooks/useQuestionsData'
import { useQuestionsStore } from './store/questions'

export const Footer = () => {
  const { corrects, incorrect, unanswer } = useQuestionsData()
  const reset = useQuestionsStore((state) => state.reset)

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>
        {`✅ ${corrects} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswer} sin responder`}
      </strong>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>Resetear Juego</Button>
      </div>
    </footer>
  )
}
