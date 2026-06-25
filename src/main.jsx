import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './store.jsx'
import { ShowroomProvider } from './showroomStore.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CartProvider>
        <ShowroomProvider>
          <App />
        </ShowroomProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
