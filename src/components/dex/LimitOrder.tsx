"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Wallets from "@/components/walletprovider/Wallets";
import { CancelAllOrderButton } from "./CancelAllOrderButton";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAppStore } from "@/stores/store"; 

export function LimitOrder() {
  const { connected } = useWallet();
  const activeTab = useAppStore((state) => state.activeTab);

  if (activeTab !== "Limit") return null;

  return (
    <div className="p-5">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-slate-400 text-xl mb-6">Limit orders</h2>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="bg-gray-700/25 p-1 mb-8 rounded-md">
            <TabsTrigger
              value="active"
              className="text-white px-4 py-2 rounded-md transition-colors duration-200
                         data-[state=active]:bg-gray-700/25 data-[state=active]:text-blue-400"
            >
              Active orders
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="text-white px-4 py-2 rounded-md transition-colors duration-200
                         data-[state=active]:bg-gray-700/25 data-[state=active]:text-blue-400"
            >
              Order history
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <hr className="w-full border-t-1 border-gray-500 m-auto mb-5 opacity-40" />
            <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-700/20  rounded-lg">
              <p className="text-white text-lg mb-6">
                Active orders are not available
              </p>
              {!connected ? <Wallets /> : <CancelAllOrderButton />}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <hr className="w-full border-t-1 border-gray-500 m-auto mb-5 opacity-40" />
            <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-700/20 rounded-lg">
              <p className="text-white text-lg mb-6">
                No order history available
              </p>
              {!connected ? <Wallets /> : <CancelAllOrderButton />}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
