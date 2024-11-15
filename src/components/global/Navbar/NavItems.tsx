"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  DollarSign,
  Coins,
  Star,
  Users,
  CheckSquare,
} from "lucide-react";
import { useAppStore } from "@/stores/store";

type NavItem = {
  name: string;
  isNew: boolean;
  hasDropdown?: boolean;
  dropdownItems?: {
    icon: React.ReactNode;
    label: string;
    description?: string;
    onClick?: () => void;
  }[];
};

export const NavItems = () => {
  const setActiveTab = useAppStore((state) => state.setActiveTab);

  const items: NavItem[] = [
    {
      name: "Trade",
      isNew: false,
      hasDropdown: true,
      dropdownItems: [
        {
          label: "Simple mode",
          icon: <DollarSign className="h-4 w-4 text-gray-400" />,
          description: "Quick and easy trading mode",
          onClick: () => setActiveTab("Swap"),
        },
        {
          label: "Advanced mode",
          icon: <Coins className="h-4 w-4 text-gray-400" />,
          description: "Full-featured trading interface",
        },
        {
          label: "Limit order",
          icon: <Star className="h-4 w-4 text-gray-400" />,
          description: "Place orders at a specific price",
          onClick: () => setActiveTab("Limit"),
        },
      ],
    },
    {
      name: "DAO",
      isNew: false,
      hasDropdown: true,
      dropdownItems: [
        {
          label: "Staking",
          icon: <Users className="h-4 w-4 text-gray-400" />,
          description: "Stake your tokens to earn rewards",
        },
        {
          label: "Delegate",
          icon: <CheckSquare className="h-4 w-4 text-gray-400" />,
          description: "Delegate tokens for voting power",
        },
        {
          label: "Snapshot",
          icon: <Star className="h-4 w-4 text-gray-400" />,
          description: "Take a snapshot of your holdings",
        },
        {
          label: "Forum",
          icon: <Users className="h-4 w-4 text-gray-400" />,
          description: "Participate in community discussions",
        },
      ],
    },
    { name: "Portfolio", isNew: false },
    { name: "Buy Crypto", isNew: false },
    { name: "Card", isNew: true },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-6 text-xl">
      {items.map((item) => (
        <div key={item.name} className="relative">
          {item.hasDropdown ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                {item.name}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-900/70 border rounded-lg border-gray-800 backdrop-blur-lg">
                {item.dropdownItems?.map((dropdownItem) => (
                  <DropdownMenuItem
                    key={dropdownItem.label}
                    className="flex flex-col items-start gap-1 p-4 hover:bg-gray-800 focus:bg-gray-800 cursor-pointer"
                    onClick={dropdownItem.onClick} // Call onClick handler if present
                  >
                    <div className="flex items-center gap-2">
                      {dropdownItem.icon}
                      <span className="text-white">{dropdownItem.label}</span>
                    </div>
                    {dropdownItem.description && (
                      <span className="text-sm text-gray-400">
                        {dropdownItem.description}
                      </span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
              {item.name}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
