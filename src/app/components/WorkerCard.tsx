'use client'

import { WorkerType } from '@/types/workers'
import Image from 'next/image'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

type Props = {
  worker: WorkerType
  style?: React.CSSProperties
  index: number // react-virtualized passes style
}

const WorkerCard: React.FC<Props> = ({ worker, style }) => {
  const [flipped, setFlipped] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault() // Prevent scrolling on Space
      setFlipped(!flipped)
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      onClick={() => setFlipped(!flipped)}
      onKeyDown={handleKeyDown}
      className="cursor-pointer perspective w-full"
      style={style}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
    >
      <motion.div
        className={`relative w-full h-72 rounded-xl shadow-md transition-transform duration-500 transform-style-preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <motion.div className="absolute w-full h-full backface-hidden bg-white rounded-xl overflow-hidden flex flex-col">
          <div className="w-full h-48 relative">
            <Image
              src={worker.image}
              alt={`${worker.name} profile`}
              fill
              className="object-cover"
              loading="lazy"
              unoptimized
            />
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold">{worker.name}</h2>
              <p className="text-gray-600">{worker.service}</p>
            </div>
            <p className="mt-2 font-medium text-indigo-600">
              ₹{Math.round(worker.pricePerDay * 1.18)} / day
            </p>
          </div>
        </motion.div>

        {/* Back */}
        <motion.div className="absolute w-full h-full backface-hidden rotate-y-180 bg-indigo-50 p-4 rounded-xl flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold text-indigo-700">More Info</h3>
          <p className="text-gray-700 text-center mt-2">
            {worker.service} – ₹{Math.round(worker.pricePerDay * 1.18)} / day
          </p>
          <p className="mt-4 text-gray-600 text-sm">Click or press Enter/Space to flip back</p>
        </motion.div>
      </motion.div>
    </motion.article>
  )
}

export default React.memo(WorkerCard, (prev, next) => prev.worker.id === next.worker.id)
