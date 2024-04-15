import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/Router/App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: '#363636',
          color: '#fff',
        },
      }}
    />
  </React.StrictMode>,
)
