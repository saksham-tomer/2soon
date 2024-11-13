"use client"

import { useState, useRef, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, Wallet as WalletIcon } from "lucide-react"

export default function EnhancedWalletAdapter() {
  const { select, wallets, publicKey, disconnect } = useWallet()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const installedWallets = wallets.filter(
    (wallet) => wallet.readyState === "Installed"
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleToggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const handleSelectWallet = (walletName: any) => {
    select(walletName)
    setIsDropdownOpen(false)
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={publicKey ? disconnect : handleToggleDropdown}
        className="h-10 gap-2 rounded-full pl-1.5 p-5 text-blue-600 bg-blue-800/20"
      >
        <WalletIcon className="w-5 h-5 mr-2 opacity-80" />
        {publicKey ? truncateAddress(publicKey.toBase58()) : "Connect wallet"}
        {!publicKey && <ChevronDown className="w-4 h-4 ml-2 opacity-80" />}
      </Button>

      {isDropdownOpen && !publicKey && (
        <div className="absolute right-0 mt-2  shadow-lg focus:outline-none z-10
        w-56 bg-gray-900/70 border rounded-lg border-gray-800 backdrop-blur-lg
        ">
          <div className="w-full">
            {installedWallets.length > 0 ? (
              installedWallets.map((wallet) => (
                <button
                  key={wallet.adapter.name}
                  className="flex items-center w-full px-4 py-2 text-sm text-white transition-colors"
                  onClick={() => handleSelectWallet(wallet.adapter.name)}
                >
                  <Image
                    src={wallet.adapter.icon}
                    alt={wallet.adapter.name}
                    width={24}
                    height={24}
                    className="mr-3"
                  />
                  <span>{wallet.adapter.name}</span>
                </button>
              ))
            ) : (
              <p className="px-4 py-2 text-sm text-gray-500">
                No wallets found. Please install a Solana wallet.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}