import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './bare.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // StrickMode : 개발 모드에서만 동작하는 코드 검사 도구
  // 잠재적인 문제를 찾기 위해 컴포넌트를 '두 번'렌더링 함 -> 배포할 때 빼야하나? 굳이 안 해도 됨 빌드할 때 빠짐
  // 화면을 그리는 함수도 순수 함수여야한다. -> 몇 번을 렌더링해도 같은 화면이 나와야함 (부수효과가 생기는지 확인하기 위해 두번씩 실행함)
  <StrictMode>
    <App />
  </StrictMode>,
)
