"use client"

import { memo } from "react"

interface ParticleEffectProps {
  x: number
  y: number
}

const ParticleEffect = memo(({ x, y }: ParticleEffectProps) => {
  return (
    <div className="fixed pointer-events-none z-50" style={{ left: x - 10, top: y - 10 }}>
      <div className="relative">
        {/* Main particle */}
        <div className="w-5 h-5 bg-slerf-gold rounded-full animate-coin-collect" />

        {/* Sparkle effects */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-slerf-lightGold rounded-full animate-coin-collect"
            style={{
              left: Math.cos((i * 60 * Math.PI) / 180) * 20,
              top: Math.sin((i * 60 * Math.PI) / 180) * 20,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
})

ParticleEffect.displayName = "ParticleEffect"

export default ParticleEffect
