"use client"

import { memo, useState } from "react"
import { RotateCcw, ExternalLink, TrendingUp, Activity, DollarSign, BarChart3 } from "lucide-react"

interface DashboardProps {
  onPlayAgain: () => void
  clickCount: number
  walletAddress?: string | null
}

const Dashboard = memo(({ onPlayAgain, clickCount, walletAddress }: DashboardProps) => {
  const [isLoading, setIsLoading] = useState(true)

  // SLERF token contract on Base chain
  const SLERF_CONTRACT = "0x233df63325933fa3f2dac8e695cd84bb2f91ab07"
  const DEXTOOLS_URL = `https://www.dextools.io/app/en/base/pair-explorer/${SLERF_CONTRACT}`

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">🎉 SLERF Dashboard Unlocked!</h1>
              <p className="text-gray-600">
                Congratulations! You collected {clickCount} coins and unlocked the trading dashboard.
              </p>
            </div>
            <button
              onClick={onPlayAgain}
              className="flex items-center gap-2 px-6 py-3 bg-slerf-gold hover:bg-slerf-darkGold text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
              aria-label="Play the coin game again"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Token</p>
                <p className="text-2xl font-bold text-gray-900">SLERF</p>
              </div>
              <div className="p-3 bg-slerf-gold bg-opacity-20 rounded-full">
                <DollarSign className="w-6 h-6 text-slerf-darkGold" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Chain</p>
                <p className="text-2xl font-bold text-blue-600">Base</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clicks</p>
                <p className="text-2xl font-bold text-green-600">{clickCount}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className="text-2xl font-bold text-purple-600">Live</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Trading Chart */}
        <div className="dashboard-container mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">SLERF Trading Chart</h2>
              <p className="text-gray-600">Real-time trading data powered by DEXTools</p>
            </div>
            <a
              href={DEXTOOLS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
              aria-label="Open SLERF chart in DEXTools (opens in new tab)"
            >
              <ExternalLink className="w-4 h-4" />
              Open in DEXTools
            </a>
          </div>

          {/* Chart Container */}
          <div className="relative w-full h-[600px] bg-gray-50 rounded-lg overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slerf-gold mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading SLERF chart...</p>
                </div>
              </div>
            )}

            <iframe
              src={`https://www.dextools.io/widget-chart/en/base/pe-light/${SLERF_CONTRACT}?theme=light&chartType=2&chartResolution=30&drawingToolbars=false`}
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              title="SLERF Token Trading Chart"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>
        </div>

        {/* Token Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Token Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Contract Address:</span>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                  {SLERF_CONTRACT.slice(0, 6)}...{SLERF_CONTRACT.slice(-4)}
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Network:</span>
                <span className="font-medium">Base Chain</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Symbol:</span>
                <span className="font-medium">SLERF</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Game Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Wallet Address:</span>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                  {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Not connected"}
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Coins Collected:</span>
                <span className="font-medium text-slerf-darkGold">{clickCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dashboard Status:</span>
                <span className="font-medium text-green-600">Unlocked ✅</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Achievement:</span>
                <span className="font-medium text-purple-600">Coin Master 🏆</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>SLERF Token Dashboard • Built with Next.js 14 & Tailwind CSS • Ready for wallet integration</p>
        </footer>
      </div>
    </div>
  )
})

Dashboard.displayName = "Dashboard"

export default Dashboard
