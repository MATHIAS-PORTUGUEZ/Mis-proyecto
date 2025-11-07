import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from "./pages/Home.jsx"
import { Reservations } from "./pages/Reservations.jsx"

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reservations" element={<Reservations />} />
      </Routes>
    </div>
  )
}



export default App;
