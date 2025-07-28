"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { Sparkles } from "lucide-react"
import CoinButton from "@/components/CoinButton"
import Dashboard from "@/components/Dashboard"
import GameStats from "@/components/GameStats"
import ParticleEffect from "@/components/ParticleEffect"
import WalletConnect from "@/components/WalletConnect"

const CLICKS_TO_UNLOCK = 5
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export default function Home() {
  const [clickCount, setClickCount] = useState(0)
  const [showDashboard, setShowDashboard] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  // Load game state from backend when wallet connects
  useEffect(() => {
    if (walletAddress && isConnected) {
      loadGameState()
    }
  }, [walletAddress, isConnected])

  const loadGameState = async () => {
    if (!walletAddress) return

    try {
      const response = await fetch(`${API_URL}/claim/status/${walletAddress}`)
      const data = await response.json()

      if (data.exists) {
        setClickCount(data.coins_collected)
        if (data.completed) {
          setShowDashboard(true)
        }
      }
    } catch (error) {
      console.error("Failed to load game state:", error)
    }
  }

  const saveGameState = async (coins: number) => {
    if (!walletAddress || !isConnected) return

    try {
      await fetch(`${API_URL}/claim/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_address: walletAddress,
          coins_collected: coins,
        }),
      })
    } catch (error) {
      console.error("Failed to save game state:", error)
    }
  }

  // Handle coin click with animation and particle effects
  const handleCoinClick = useCallback(
    (event: React.MouseEvent) => {
      if (showDashboard || !isConnected) return

      setIsAnimating(true)

      // Create particle effect at click position
      const rect = (event.target as HTMLElement).getBoundingClientRect()
      const newParticle = {
        id: Date.now(),
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      }

      setParticles((prev) => [...prev, newParticle])

      // Remove particle after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id))
      }, 800)

      setClickCount((prev) => {
        const newCount = prev + 1

        // Save to backend
        saveGameState(newCount)

        if (newCount >= CLICKS_TO_UNLOCK) {
          setTimeout(() => setShowDashboard(true), 500)
        }
        return newCount
      })

      // Reset animation state
      setTimeout(() => setIsAnimating(false), 600)
    },
    [showDashboard, isConnected, walletAddress],
  )

  // Reset game state
  const handlePlayAgain = useCallback(async () => {
    setShowDashboard(false)
    setClickCount(0)
    setIsAnimating(false)
    setParticles([])

    // Reset in backend
    if (walletAddress && isConnected) {
      await saveGameState(0)
    }
  }, [walletAddress, isConnected])

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space" && !showDashboard && isConnected) {
        event.preventDefault()
        // Simulate click event
        const coinButton = document.getElementById("coin-button")
        if (coinButton) {
          coinButton.click()
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [showDashboard, isConnected])

  // Show wallet connection screen if not connected
  if (!isConnected) {
    return (
      <main className="game-container">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-slerf-gold animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slerf-darkGold to-slerf-gold bg-clip-text text-transparent">
              SLERF
            </h1>
            <Sparkles className="w-8 h-8 text-slerf-gold animate-pulse" />
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto mb-8">
            Connect your wallet to start the coin-collecting adventure!
          </p>
        </div>

        <WalletConnect
          onConnect={(address) => {
            setWalletAddress(address)
            setIsConnected(true)
          }}
          onDisconnect={() => {
            setWalletAddress(null)
            setIsConnected(false)
            setShowDashboard(false)
            setClickCount(0)
          }}
        />

        <footer className="absolute bottom-4 text-center text-xs text-gray-400">
          <p>SLERF Token Dashboard • Built with Next.js & Web3</p>
        </footer>
      </main>
    )
  }

  if (showDashboard) {
    return <Dashboard onPlayAgain={handlePlayAgain} clickCount={clickCount} walletAddress={walletAddress} />
  }

  const progress = (clickCount / CLICKS_TO_UNLOCK) * 100
  const isNearUnlock = clickCount >= CLICKS_TO_UNLOCK - 1

  return (
    <main className="game-container">
      {/* Particle Effects */}
      {particles.map((particle) => (
        <ParticleEffect key={particle.id} x={particle.x} y={particle.y} />
      ))}

      {/* Wallet Info */}
      <div className="absolute top-4 right-4">
        <WalletConnect
          onConnect={(address) => {
            setWalletAddress(address)
            setIsConnected(true)
          }}
          onDisconnect={() => {
            setWalletAddress(null)
            setIsConnected(false)
            setShowDashboard(false)
            setClickCount(0)
          }}
          isConnected={isConnected}
          address={walletAddress}
        />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-8 h-8 text-slerf-gold animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slerf-darkGold to-slerf-gold bg-clip-text text-transparent">
            SLERF
          </h1>
          <Sparkles className="w-8 h-8 text-slerf-gold animate-pulse" />
        </div>
        <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto">
          Click the golden coin {CLICKS_TO_UNLOCK} times to unlock your trading dashboard!
        </p>
      </div>

      {/* Game Stats */}
      <GameStats clickCount={clickCount} totalClicks={CLICKS_TO_UNLOCK} progress={progress} />

      {/* Main Coin Button */}
      <div className="relative mb-8">
        <CoinButton
          onClick={handleCoinClick}
          isAnimating={isAnimating}
          isNearUnlock={isNearUnlock}
          clickCount={clickCount}
        />

        {/* Glow effect when near unlock */}
        {isNearUnlock && <div className="absolute inset-0 rounded-full bg-slerf-gold opacity-30 animate-ping" />}
      </div>

      {/* Progress Indicator */}
      <div className="w-full max-w-md mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Progress</span>
          <span className="text-sm font-medium text-slerf-darkGold">
            {clickCount}/{CLICKS_TO_UNLOCK}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-slerf-gold to-slerf-darkGold transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-gray-500 max-w-sm">
        <p className="text-sm mb-2">
          💡 <strong>Tip:</strong> You can also press <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Space</kbd>{" "}
          to click!
        </p>
        {clickCount > 0 && clickCount < CLICKS_TO_UNLOCK && (
          <p className="text-xs animate-pulse">
            {CLICKS_TO_UNLOCK - clickCount} more click{CLICKS_TO_UNLOCK - clickCount !== 1 ? "s" : ""} to go! 🚀
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-center text-xs text-gray-400">
        <p>SLERF Token Dashboard • Built with Next.js & Tailwind CSS</p>
      </footer>
    </main>
  )
}
