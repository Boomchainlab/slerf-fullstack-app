"use client"

import type React from "react"

import { memo } from "react"
import { Coins } from "lucide-react"

interface CoinButtonProps {
  onClick: (event: React.MouseEvent) => void
  isAnimating: boolean
  isNearUnlock: boolean
  clickCount: number
}

const CoinButton = memo(({ onClick, isAnimating, isNearUnlock, clickCount }: CoinButtonProps) => {
  return (
    <button
      id="coin-button"
      onClick={onClick}
      className={`
        coin-button
        ${isAnimating ? "animate-coin-flip" : "animate-float"}
        ${isNearUnlock ? "animate-glow" : "animate-pulse-gold"}
        focus:outline-none focus:ring-4 focus:ring-slerf-gold focus:ring-opacity-50
        transform-gpu
      `}
      aria-label={`Click coin to collect. ${clickCount} clicks collected.`}
      aria-describedby="coin-instructions"
    >
      <div className="relative z-10 flex items-center justify-center">
        <Coins className="w-12 h-12 text-slerf-darkGold drop-shadow-lg" />
      </div>

      {/* Ripple effect on click */}
      {isAnimating && <div className="absolute inset-0 rounded-full bg-slerf-lightGold opacity-50 animate-ping" />}
    </button>
  )
})

CoinButton.displayName = "CoinButton"

export default CoinButton
