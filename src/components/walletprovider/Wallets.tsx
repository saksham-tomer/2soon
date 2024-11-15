'use client';

import { useState, useRef, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, Wallet as WalletIcon, X } from "lucide-react";
import { WalletName } from "@solana/wallet-adapter-base";
import { createPortal } from 'react-dom';

export default function WalletAdapter() {
  const { select, wallets, publicKey, disconnect } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById('modal-root') || document.body);
  }, []);

  const installedWallets = wallets.filter(
    (wallet) => wallet.readyState === "Installed"
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSelectWallet = (walletName: WalletName) => {
    select(walletName);
    setIsModalOpen(false);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const Modal = () => (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        ref={modalRef}
        className="relative z-[10000] w-full max-w-md mx-4 bg-gray-900 border border-gray-800 rounded-lg shadow-xl animate-in fade-in-0 zoom-in-95 duration-200"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Connect Wallet</h2>
          <button 
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {installedWallets.length > 0 ? (
              installedWallets.map((wallet) => (
                <button
                  key={wallet.adapter.name}
                  className="flex items-center p-4 text-sm text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
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

          <p className="mt-6 text-xs text-gray-500 text-center">
            By connecting your wallet, you agree to our{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Button
        onClick={publicKey ? disconnect : handleToggleModal}
        className="h-10 gap-2 rounded-full pl-1.5 p-5 text-blue-600 bg-blue-800/20"
      >
        <WalletIcon className="w-5 h-5 mr-2 opacity-80" />
        {publicKey ? truncateAddress(publicKey.toBase58()) : "Connect wallet"}
        {!publicKey && <ChevronDown className="w-4 h-4 ml-2 opacity-80" />}
      </Button>

      {isModalOpen && !publicKey && portalElement && createPortal(<Modal />, portalElement)}
    </>
  );
}