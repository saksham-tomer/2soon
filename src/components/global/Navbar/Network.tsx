"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { FaEthereum } from "react-icons/fa6";
import { FaBitcoin } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { SiPolygon } from "react-icons/si";

type Network = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
};

const networks: Network[] = [
  {
    id: "Bitcoin",
    name: "Bitcoin",
    icon: <FaBitcoin className="h-5 w-5" />,
    color: "text-white",
    bgColor: "bg-orange-600",
  },
  {
    id: "Ethereum",
    name: "Ethereum",
    icon: <FaEthereum className="h-5 w-5" />,
    color: "text-white",
    bgColor: "bg-[#627EEA]",
  },
  {
    id: "Solana",
    name: "Solana",
    icon: <SiSolana className="h-5 w-5" />,
    color: "text-white",
    bgColor: "bg-[#10BC93]",
  },
  {
    id: "Polygon",
    name: "Polygon",
    icon: <SiPolygon className="h-5 w-5" />,
    color: "text-white",
    bgColor: "bg-purple-500",
  },
];

export function NetworkSelector() {
  const [selectedNetwork, setSelectedNetwork] = React.useState<Network>(
    networks[0]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`${selectedNetwork.bgColor} h-10 gap-2 rounded-full pl-1.5 p-5 ${selectedNetwork.color}`}
        >
          <span className="flex items-center gap-2">
            {selectedNetwork.icon}
            <span className="hidden md:block">{selectedNetwork.name}</span>
          </span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[156px] bg-gray-900/70 border rounded-lg border-gray-800 backdrop-blur-lg"
      >
        {networks.map((network) => (
          <DropdownMenuItem
            key={network.id}
            onClick={() => setSelectedNetwork(network)}
            className={`flex items-center gap-2 text-white hover:bg-white/10 ${network.color}`}
          >
            {network.icon}
            {network.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
