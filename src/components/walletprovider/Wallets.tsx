"use client";

import { useState, useRef, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, Wallet as WalletIcon, X } from "lucide-react";
import { WalletName } from "@solana/wallet-adapter-base";

export default function EnhancedWalletAdapter() {
  const { select, wallets, publicKey, disconnect } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const installedWallets = wallets.filter(
    (wallet) => wallet.readyState === "Installed"
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSelectWallet = (walletName : WalletName) => {
    select(walletName);
    setIsModalOpen(false);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="relative">
      <Button
        onClick={publicKey ? disconnect : handleToggleModal}
        className="h-10 gap-2 rounded-full pl-1.5 p-5 text-blue-600 bg-blue-800/20"
      >
        <WalletIcon className="w-5 h-5 mr-2 opacity-80" />
        {publicKey ? truncateAddress(publicKey.toBase58()) : "Connect wallet"}
        {!publicKey && <ChevronDown className="w-4 h-4 ml-2 opacity-80" />}
      </Button>

      {isModalOpen && !publicKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div
            ref={modalRef}
            className="w-full max-w-md p-6 bg-gray-900 border border-gray-800 rounded-lg shadow-lg backdrop-blur-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Connect Wallet</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {installedWallets.length > 0 ? (
                installedWallets.map((wallet) => (
                  <button
                    key={wallet.adapter.name}
                    className="flex items-center p-3 text-sm text-white bg-gray-900/70 backdrop-blur-xl rounded-lg hover:bg-gray-700 transition-colors"
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
                <p className="col-span-2 px-4 py-2 text-sm text-gray-500 text-center">
                  No wallets found. Please install a Solana wallet.
                </p>
              )}
            </div>
            <p className="mt-4 text-xs text-gray-500 text-center">
              By connecting your wallet, you agree to our{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
