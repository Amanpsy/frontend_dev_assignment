'use client'

import { WorkerType } from '@/types/workers'
import { useState, useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { Grid, GridCellProps } from 'react-virtualized'
import 'react-virtualized/styles.css'
import WorkerCard from './components/WorkerCard'
import { gsap } from 'gsap'

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const containerRef = useRef<HTMLDivElement | null>(null)
  const gridRef = useRef<Grid | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await import('../../workers.json')
        setWorkersData(response.default)
      } catch (error) {
        console.error('Failed to load workers:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  
  // GSAP entrance animation
  useEffect(() => {
    if (!loading && containerRef.current) {
      gsap.from(containerRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
      })
    }
  }, [loading, workersData])

  const filteredWorkers = useMemo(() => {
    return workersData
      .filter((worker) => worker.pricePerDay > 0 && worker.id !== null)
      .filter((worker) =>
        worker.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [workersData, search])

  const columns = 4
  const cardWidth = 360
  const cardHeight = 340
  const rowCount = Math.ceil(filteredWorkers.length / columns)

  const cellRenderer = ({ columnIndex, rowIndex, style }: GridCellProps) => {
    const index = rowIndex * columns + columnIndex
    const worker = filteredWorkers[index]
    if (!worker) return null

    return (
      <div
        key={worker.id}
        style={{ ...style, padding: 12 }}
        className="transition-transform hover:scale-105 hover:shadow-2xl rounded-xl"
      >
        <WorkerCard worker={worker} index={index} />
      </div>
    )
  }

  return (
    <main className="w-full px-6 py-12 bg-gradient-to-b from-indigo-50 to-indigo-100 min-h-screen">
      <h1 className="text-5xl font-extrabold mb-10 text-center text-indigo-700 drop-shadow-lg">
        Meet Our Skilled Workers
      </h1>

      {/* Search bar */}
      <div className="max-w-xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Search workers by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 border-2 border-indigo-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 placeholder:text-indigo-400"
        />
      </div>

      {loading ? (
        <div
          className="flex justify-center"
          ref={containerRef}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-[1500px]">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="border rounded-xl shadow-lg animate-pulse bg-white h-72"
              />
            ))}
          </div>
        </div>
      ) : filteredWorkers.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 mt-12 text-lg italic"
        >
          No workers found.
        </motion.p>
      ) : (
        <div className="flex justify-center" ref={containerRef}>
          <div className="h-[900px] w-full max-w-[1500px]">
            <Grid
              ref={gridRef}
              cellRenderer={cellRenderer}
              columnCount={columns}
              columnWidth={cardWidth}
              height={900}
              rowCount={rowCount}
              rowHeight={cardHeight}
              width={columns * cardWidth + 32}
            />
          </div>
        </div>
      )}
    </main>
  )
}
