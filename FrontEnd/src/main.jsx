import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Context from './context.jsx'
import {Provider} from 'react-redux'
import { store } from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Context>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Context>
    </Provider>
  </StrictMode>
)
