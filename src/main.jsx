import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MovieContextProvider from './context/MovieContext.jsx'

createRoot(document.getElementById('root')).render(
   <MovieContextProvider>
       <App />
   </MovieContextProvider>
)
