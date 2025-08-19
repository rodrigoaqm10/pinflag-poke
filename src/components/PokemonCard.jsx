import React from 'react'
import { useNavigate } from 'react-router-dom'
import { imageUrlFor } from '../api/pokeapi.js'

export default function PokemonCard({ id, name, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate()
  return (
    <div className="card" style={{padding:14, display:'flex', gap:12, alignItems:'center'}}>
      <img
        src={imageUrlFor(id)}
        width="96"
        height="96"
        alt={name}
        style={{ background:'#0d1117', borderRadius:16, objectFit:'contain' }}
        onClick={()=>navigate(`/pokedex/${id}`)}
      />
      <div style={{flex:1, minWidth:0}} onClick={()=>navigate(`/pokedex/${id}`)}>
        <div className="badge">#{String(id).padStart(4,'0')}</div>
        <div style={{fontSize:18, fontWeight:900, textTransform:'capitalize'}}>{name}</div>
      </div>
      <button aria-label="toggle-favorite" className="favorite" onClick={()=>onToggleFavorite(id)}>{isFavorite ? '★' : '☆'}</button>
    </div>
  )
}
