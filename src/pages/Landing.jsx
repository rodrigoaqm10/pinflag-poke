import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div className="container" style={{minHeight:'100dvh', display:'grid', placeItems:'center'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:72, fontWeight:900, lineHeight:1, marginBottom:12, letterSpacing:-1}}>Pokedex</div>
        <div style={{opacity:.8, marginBottom:28}}>Explora y aprende sobre los Pokemones usando la PokeAPI pública</div>
        <button className="btn" onClick={()=>navigate('/grid')}>START</button>
      </div>
    </div>
  )
}
