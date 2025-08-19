const BASE = 'https://pokeapi.co/api/v2'

const idFromUrl = (url) => {
  const parts = url.split('/').filter(Boolean)
  return Number(parts[parts.length - 1])
}

const imageFromId = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

export async function fetchAllPokemonList() {
  const res = await fetch(`${BASE}/pokemon?limit=1302`)
  if (!res.ok) throw new Error('Failed to load list')
  const data = await res.json()
  return data.results.map(r => ({ id: idFromUrl(r.url), name: r.name, url: r.url }))
}

export function imageUrlFor(id) {
  return imageFromId(id)
}

export async function fetchPokemonEntry(id) {
  const [detailsRes, speciesRes] = await Promise.all([
    fetch(`${BASE}/pokemon/${id}`),
    fetch(`${BASE}/pokemon-species/${id}`)
  ])
  if (!detailsRes.ok || !speciesRes.ok) throw new Error('Failed to load pokemon')
  const details = await detailsRes.json()
  const species = await speciesRes.json()
  const description = (species.flavor_text_entries.find(e => e.language.name === 'en') || {}).flavor_text || ''
  return {
    id: details.id,
    name: details.name,
    types: details.types.map(t => t.type.name),
    weight: details.weight,
    height: details.height,
    image: imageFromId(details.id),
    description: description.replace(/\f|\n|\r/g, ' ').trim()
  }
}
