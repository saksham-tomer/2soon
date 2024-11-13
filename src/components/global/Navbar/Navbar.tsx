"use client";

import { NavItems } from "./NavItems";
import { RiExchange2Line } from "react-icons/ri";
import { NetworkSelector } from "./Network";
import Wallets from "@/components/walletprovider/Wallets";
import { MobileNavItems } from "./MobileNav";

export const Navbar = () => {
  return (
    <header className="relative top-0 inset-x-0 h-16 z-10 flex justify-between items-center px-5 md:px-10 bg-transparent backdrop-blur-md">
      {/* Left side: Logo and Nav items */}
      <div className="flex items-center gap-10 text-white">
        {/* Logo */}
        <RiExchange2Line className="text-3xl md:text-4xl" />

        {/* Desktop Navigation Items */}
        <div className="hidden lg:block">
          <NavItems />
        </div>
      </div>

      {/* Right side: Network Selector, Wallets, and Mobile Navigation */}
      <div className="flex items-center gap-5 text-white">
        {/* Network Selector */}
        <div className="hidden lg:block">
          <NetworkSelector />
        </div>

        {/* Wallet Connect Button (Desktop) */}
        <div className="hidden lg:block">
          <Wallets />
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <MobileNavItems />
        </div>
      </div>
    </header>
  );
};
