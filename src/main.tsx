import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

//  무한 스크롤 구현 위한 QueryClient 인스턴스 생성
const queryClient = new QueryClient();

import 'aos/dist/aos.css'
import AOS from 'aos'

AOS.init()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>{' '}
    </QueryClientProvider>
  </StrictMode>,
)
