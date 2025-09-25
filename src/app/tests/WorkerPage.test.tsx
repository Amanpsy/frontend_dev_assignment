import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WorkersPage from '../page'
import type { WorkerType } from '@/types/workers'
import { vi } from 'vitest'

vi.mock('../../workers.json', () => ({
  default: [
    { id: 1, name: 'Alice', pricePerDay: 100 },
    { id: 2, name: 'Bob', pricePerDay: 150 },
  ],
}))

vi.mock('../components/WorkerCard', () => ({
  default: ({ worker }: { worker: WorkerType }) => <div>{worker.name}</div>,
}))

describe('WorkersPage', () => {
  test('renders title and search bar', () => {
    const { getByText, getByPlaceholderText } = render(<WorkersPage />)

    expect(getByText(/meet our skilled workers/i)).toBeInTheDocument()
    expect(getByPlaceholderText(/search workers by name/i)).toBeInTheDocument()
  })

  test('filters workers based on search', async () => {
    const { getByPlaceholderText, queryByText } = render(<WorkersPage />)

    const searchInput = getByPlaceholderText(/search workers by name/i)
    await userEvent.type(searchInput, 'Bob')

    expect(queryByText(/Alice/i)).not.toBeInTheDocument()
  })

  test('shows "No workers found" if search does not match', async () => {
    const { getByPlaceholderText, getByText } = render(<WorkersPage />)

    const searchInput = getByPlaceholderText(/search workers by name/i)
    await userEvent.type(searchInput, 'Zoe')

    expect(getByText(/No workers found/i)).toBeInTheDocument()
  })
})
