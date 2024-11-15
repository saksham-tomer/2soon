"use client";

import { NavItems } from "./NavItems";
import { RiExchange2Line } from "react-icons/ri";
import { NetworkSelector } from "./Network";
import Wallets from "@/components/walletprovider/Wallets";
import { MobileNavItems } from "./MobileNav";

export const Navbar = () => {
  return (
    <header className="relative top-0 inset-x-0 h-16 z-10 flex justify-between items-center px-5 md:px-10 bg-transparent backdrop-blur-md">
      <div className="flex items-center gap-10 text-white">
        <RiExchange2Line className="text-3xl md:text-4xl" />

        <div className="hidden lg:block">
          <NavItems />
        </div>
      </div>

      <div className="flex items-center gap-5 text-white">
        <div className="hidden md:block">
          <NetworkSelector />
        </div>

        <div className="hidden md:block">
          <Wallets />
        </div>

        <div className="lg:hidden">
          <MobileNavItems />
        </div>
      </div>
    </header>
  );
};
