import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import PokeGrid from './pages/PokeGrid.jsx'
import Pokedex from './pages/Pokedex.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/grid" element={<PokeGrid />} />
      <Route path="/pokedex/:id" element={<Pokedex />} />
    </Routes>
  )
}
