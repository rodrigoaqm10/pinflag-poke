import React from 'react'

export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null
  const items = []
  const max = Math.min(pages, 8)
  let start = Math.max(1, page - 3)
  if (start + max - 1 > pages) start = pages - max + 1
  for (let i = 0; i < max; i++) {
    const p = start + i
    items.push(
      <button key={p} aria-current={p === page ? 'page' : undefined} onClick={()=>onChange(p)}>{p}</button>
    )
  }
  return (
    <div className="paginator">
      <button onClick={()=>onChange(1)} disabled={page===1}>First</button>
      <button onClick={()=>onChange(Math.max(1, page-1))} disabled={page===1}>Prev</button>
      {items}
      <button onClick={()=>onChange(Math.min(pages, page+1))} disabled={page===pages}>Next</button>
      <button onClick={()=>onChange(pages)} disabled={page===pages}>Last</button>
    </div>
  )
}
