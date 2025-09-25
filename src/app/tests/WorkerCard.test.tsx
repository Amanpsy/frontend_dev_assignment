import React from 'react'
import { render, screen } from '@testing-library/react'
import WorkerCard from '../components/WorkerCard'

const worker = {
  id: 1,
  name: 'Alice',
  service: 'Plumbing',
  pricePerDay: 100,
  image: '/alice.jpg',
}

describe('WorkerCard', () => {
  test('renders worker front info', () => {
    render(<WorkerCard worker={worker} index={0} />)

    // Check front content
    expect(screen.getByText(worker.name)).toBeInTheDocument()
    expect(screen.getByText(worker.service)).toBeInTheDocument()
  })
})
