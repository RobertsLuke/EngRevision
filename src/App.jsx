import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Import components
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Practice from './pages/Practice'
import PoemsSelection from './pages/PoemsSelection'
import PoemQuotes from './pages/PoemQuotes'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practice/:topic" element={<Practice />} />
            <Route path="/quotes" element={<PoemsSelection />} />
            <Route path="/quotes/:poemId" element={<PoemQuotes />} />
          </Routes>
        </main>
        <footer className="bg-slate-800 text-white p-4 text-center">
          <p>© {new Date().getFullYear()} English GCSE Revision App</p>
        </footer>
      </div>
    </Router>
  )
}

export default App