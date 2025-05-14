import React from 'react'
import ReactDOM from 'react-dom/client'
import './node-polyfills' // Import the polyfills
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)