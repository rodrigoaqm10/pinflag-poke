import { useEffect, useState } from 'react'

const KEY = 'pf_favorites'

export default function useFavorites() {
  const [favorites, setFavorites] = useState(()=>{
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : []
    } catch { return [] }
  })

  useEffect(()=>{
    localStorage.setItem(KEY, JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (id) => {
    setFavorites((prev)=> prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id])
  }

  const isFavorite = (id) => favorites.includes(id)

  return { favorites, toggleFavorite, isFavorite }
}
