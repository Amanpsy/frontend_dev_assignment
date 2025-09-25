import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WorkersPage from '../page'

// Mock workers.json
vi.mock('../../workers.json', () => ({
  default: [
    { id: 1, name: 'Alice', pricePerDay: 100 },
    { id: 2, name: 'Bob', pricePerDay: 150 },
  ],
}))

// Mock WorkerCard to render just the name
vi.mock('../components/WorkerCard', () => ({
  default: ({ worker }: any) => <div>{worker.name}</div>,
}))

describe('WorkersPage', () => {
  test('renders title and search bar', () => {
    render(<WorkersPage />)

    expect(screen.getByText(/meet our skilled workers/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/search workers by name/i)).toBeInTheDocument()
  })

  test('filters workers based on search', async () => {
    render(<WorkersPage />)

    const searchInput = screen.getByPlaceholderText(/search workers by name/i)
    await userEvent.type(searchInput, 'Bob')

    // Now the mock renders name directly, so we can find Bob
    expect(screen.queryByText(/Alice/i)).not.toBeInTheDocument()
  })

  test('shows "No workers found" if search does not match', async () => {
    render(<WorkersPage />)

    const searchInput = screen.getByPlaceholderText(/search workers by name/i)
    await userEvent.type(searchInput, 'Zoe')

    expect(screen.getByText(/No workers found/i)).toBeInTheDocument()
  })
})
