import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import { Layout } from './Layout.tsx'
import { ContextProvider } from './context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <Layout />
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
