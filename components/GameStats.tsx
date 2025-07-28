"use client"

import { memo } from "react"
import { Trophy, Target, Zap } from "lucide-react"

interface GameStatsProps {
  clickCount: number
  totalClicks: number
  progress: number
}

const GameStats = memo(({ clickCount, totalClicks, progress }: GameStatsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {/* Clicks Counter */}
      <div className="bg-white rounded-lg shadow-lg p-4 min-w-[120px] text-center border border-gray-100">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Zap className="w-5 h-5 text-slerf-gold" />
          <span className="text-sm font-medium text-gray-600">Clicks</span>
        </div>
        <div className="text-2xl font-bold text-slerf-darkGold">{clickCount}</div>
      </div>

      {/* Target */}
      <div className="bg-white rounded-lg shadow-lg p-4 min-w-[120px] text-center border border-gray-100">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Target className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-medium text-gray-600">Target</span>
        </div>
        <div className="text-2xl font-bold text-blue-600">{totalClicks}</div>
      </div>

      {/* Progress Percentage */}
      <div className="bg-white rounded-lg shadow-lg p-4 min-w-[120px] text-center border border-gray-100">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Trophy className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium text-gray-600">Progress</span>
        </div>
        <div className="text-2xl font-bold text-green-600">{Math.round(progress)}%</div>
      </div>
    </div>
  )
})

GameStats.displayName = "GameStats"

export default GameStats
