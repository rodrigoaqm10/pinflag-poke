import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchPokemonEntry } from '../api/pokeapi.js'
import Loader from '../components/Loader.jsx'

export default function Pokedex() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [entry, setEntry] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
    fetchPokemonEntry(id)
      .then((e)=>{ setEntry(e); setLoading(false) })
      .catch(()=>{ setError('Failed to load'); setLoading(false) })
  }, [id])

  if (loading) return <Loader />
  if (error) return <div className="center">{error}</div>

  return (
    <div className="container">
      <div style={{marginBottom:12}}>
        <button className="btn secondary" onClick={()=>navigate('/grid')}>Back to Grid</button>
      </div>
      <div className="card" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, padding:16}}>
        <div style={{display:'grid', placeItems:'center', background:'#0d1117', borderRadius:16}}>
          <img src={entry.image} alt={entry.name} style={{maxWidth:'100%', height:'auto'}}/>
        </div>
        <div>
          <div className="badge">#{String(entry.id).padStart(4,'0')}</div>
          <h1 style={{margin:'8px 0', fontSize:28, textTransform:'capitalize'}}>{entry.name}</h1>
          <div style={{display:'flex', gap:8, flexWrap:'wrap', margin:'8px 0'}}>
            {entry.types.map(t => <span key={t} className="badge" style={{textTransform:'capitalize'}}>{t}</span>)}
          </div>
          <div style={{opacity:.9, lineHeight:1.5, marginTop:8}}>{entry.description}</div>
          <div style={{display:'flex', gap:16, marginTop:16}}>
            <div className="card" style={{padding:'12px 16px'}}>
              <div style={{fontSize:12, opacity:.8}}>HT</div>
              <div style={{fontSize:18, fontWeight:900}}>{(entry.height/10).toFixed(1)} m</div>
            </div>
            <div className="card" style={{padding:'12px 16px'}}>
              <div style={{fontSize:12, opacity:.8}}>WT</div>
              <div style={{fontSize:18, fontWeight:900}}>{(entry.weight/10).toFixed(1)} kg</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
