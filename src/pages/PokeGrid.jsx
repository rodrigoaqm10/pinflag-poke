import React, { useEffect, useMemo, useState } from 'react'
import { fetchAllPokemonList } from '../api/pokeapi.js'
import PokemonCard from '../components/PokemonCard.jsx'
import Pagination from '../components/Pagination.jsx'
import Loader from '../components/Loader.jsx'
import useFavorites from '../hooks/useFavorites.js'

const PAGE_SIZE = 30

export default function PokeGrid() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [items, setItems] = useState([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  useEffect(()=>{
    setLoading(true)
    fetchAllPokemonList()
      .then((list)=>{ setItems(list); setLoading(false) })
      .catch(()=>{ setError('Failed to load'); setLoading(false) })
  }, [])

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase()
    let list = items
    if (q) list = list.filter(x => x.name.includes(q))
    if (showOnlyFavorites) list = list.filter(x => favorites.includes(x.id))
    return list
  }, [items, query, showOnlyFavorites, favorites])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE)

  useEffect(()=>{ setPage(1) }, [query, showOnlyFavorites])

  if (loading) return <Loader />
  if (error) return <div className="center">{error}</div>

  return (
    <div className="container">
      <div className="header">
        <input
          className="input"
          placeholder="Buscar por nombre..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />
        <button className="btn secondary" onClick={()=>setShowOnlyFavorites(v=>!v)}>
          {showOnlyFavorites ? 'Mostrar Todos' : 'Mostrar Favoritos'}
        </button>
      </div>
      <div className="grid">
        {current.map(p => (
          <PokemonCard
            key={p.id}
            id={p.id}
            name={p.name}
            isFavorite={isFavorite(p.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
      <Pagination page={page} pages={pages} onChange={setPage} />
    </div>
  )
}
