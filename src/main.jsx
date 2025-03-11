import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import MovieContextProvider from './context/MovieContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter
        future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
    >
        <MovieContextProvider>
            <App />
        </MovieContextProvider>
    </BrowserRouter>
)
