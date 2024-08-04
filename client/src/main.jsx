import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserProvider } from './context/AuthContext.jsx'
import { StockProvider } from './context/StockContext.jsx'
import App from './App.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <UserProvider>
        <StockProvider>
            <App />
        </StockProvider>
    </UserProvider>
)
