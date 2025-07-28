"use client"

import { memo, useState } from "react"
import { Wallet, LogOut, Copy, Check } from "lucide-react"

interface WalletConnectProps {
  onConnect: (address: string) => void
  onDisconnect: () => void
  isConnected?: boolean
  address?: string | null
}

const WalletConnect = memo(({ onConnect, onDisconnect, isConnected = false, address }: WalletConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleConnect = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("Please install MetaMask or another Web3 wallet!")
      return
    }

    setIsConnecting(true)
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length > 0) {
        onConnect(accounts[0])
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      alert("Failed to connect wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => {
    onDisconnect()
  }

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        <div className="flex items-center gap-2">
          <code className="text-sm font-mono text-gray-700">{formatAddress(address)}</code>
          <button
            onClick={copyAddress}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Copy wallet address"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
          </button>
        </div>
        <button
          onClick={handleDisconnect}
          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
          aria-label="Disconnect wallet"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Connect Web3 wallet"
    >
      <Wallet className="w-5 h-5" />
      {isConnecting ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Connecting...
        </>
      ) : (
        "Connect Wallet"
      )}
    </button>
  )
})

WalletConnect.displayName = "WalletConnect"

export default WalletConnect
