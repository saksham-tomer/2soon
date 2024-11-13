"use client";

import { NavItems } from "./NavItems";
import { RiExchange2Line } from "react-icons/ri";
import { NetworkSelector } from "./Network";
import Wallets from "@/components/walletprovider/Wallets";
import { MobileNavItems } from "./MobileNav";

export const Navbar = () => {
  return (
    <header className="flex justify-between m-5 items-center align-middle">
      <div className="flex gap-10 text-white">
        <div>
          <RiExchange2Line className="text-5xl" />
        </div>
        <div className=" lg:block hidden">
          <NavItems />
        </div>
      </div>
      <div className="flex gap-5 text-white">
        <div>
          <NetworkSelector />
        </div>
        <div className="hidden lg:block">
          <Wallets />
        </div>
        <div className="lg:hidden">
          <MobileNavItems />
        </div>
      </div>
    </header>
  );
};
