import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.sass'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
