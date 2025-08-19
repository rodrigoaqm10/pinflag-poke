import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import * as api from '../api/pokeapi.js'
import PokeGrid from './PokeGrid.jsx'

vi.mock('../api/pokeapi.js')

const makeList = (n) => Array.from({length:n}).map((_,i)=>({ id: i+1, name: `poke${i+1}`, url: `https://pokeapi.co/api/v2/pokemon/${i+1}/` }))

describe('PokeGrid', () => {
  it('renders loader and then first page items', async () => {
    api.fetchAllPokemonList.mockResolvedValue(makeList(60))
    render(<MemoryRouter><PokeGrid /></MemoryRouter>)
    expect(screen.getByRole('progressbar', { hidden: true })).toBeInTheDocument()
    await waitFor(()=> expect(screen.getAllByText(/poke\d+/i).length).toBeGreaterThan(0))
    expect(screen.getAllByText(/poke/i).length).toBe(30)
  })

  it('filters by name', async () => {
    api.fetchAllPokemonList.mockResolvedValue(makeList(60))
    render(<MemoryRouter><PokeGrid /></MemoryRouter>)
    await waitFor(()=> expect(screen.getAllByText(/poke/i).length).toBe(30))
    const input = screen.getByPlaceholderText(/search by name/i)
    fireEvent.change(input, { target: { value: 'poke5' } })
    await waitFor(()=>expect(screen.getAllByText(/poke/i).length).toBe(1))
  })
})
