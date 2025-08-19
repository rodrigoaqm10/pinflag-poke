import React from 'react'

export default function Loader() {
  return (
    <div className="center">
      <div role="progressbar" aria-busy="true" style={{width:56, height:56, borderRadius:'50%', border:'6px solid #223145', borderTopColor:'var(--primary)', animation:'spin 1s linear infinite'}}/>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
