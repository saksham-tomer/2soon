"use client";

import { useAppStore } from "@/stores/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownUp } from "lucide-react";
import TokenInput from "./tokenInput";
import Wallets from "../walletprovider/Wallets";
import { useWallet } from "@solana/wallet-adapter-react";
import { SwapButton } from "./SwapButton";
import { LimitOrder } from "./LimitOrder";

const SwapForm: React.FC = () => {
  const {
    selectedPayToken,
    setSelectedPayToken,
    selectedReceiveToken,
    setSelectedReceiveToken,
    payAmount,
    setPayAmount,
    receiveAmount,
    setReceiveAmount,
    handleSwapDirection,
    activeTab,
    setActiveTab,
    limitBuyToken,
    setLimitBuyToken,
    limitBuyAmount,
    setLimitBuyAmount,
    limitPayToken,
    setLimitPayToken,
    limitPayAmount,
    setLimitPayAmount,
  } = useAppStore();

  const { connected } = useWallet();

  return (
    <div className="flex flex-col min-h-screen mt-5 gap-20 p-5 items-center justify-center">
      <Card className="w-full max-w-md space-y-6 bg-gray-700/25 backdrop-blur-xl p-4 text-white/80 border-none rounded-3xl">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "Swap" | "Limit")}
          className="w-full"
        >
          <TabsList className="bg-neutral-950/15">
            <TabsTrigger
              value="Swap"
              className="text-white px-4 py-2 rounded-md transition-colors duration-200
                         data-[state=active]:bg-gray-700/25 data-[state=active]:text-blue-400"
            >
              Swap
            </TabsTrigger>
            <TabsTrigger
              value="Limit"
              className="text-white px-4 py-2 rounded-md transition-colors duration-200
                         data-[state=active]:bg-gray-700/25 data-[state=active]:text-blue-400"
            >
              Limit
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Swap">
            <TokenInput
              label="You pay"
              token={selectedPayToken}
              amount={payAmount}
              onTokenChange={setSelectedPayToken}
              onAmountChange={setPayAmount}
            />
            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-gray-800"
                onClick={handleSwapDirection}
              >
                <ArrowDownUp className="h-4 w-4" />
              </Button>
            </div>
            <TokenInput
              label="You receive"
              token={selectedReceiveToken}
              amount={receiveAmount}
              onTokenChange={setSelectedReceiveToken}
              onAmountChange={setReceiveAmount}
            />
            <div className="flex justify-center items-center mt-5">
              {!connected ? <Wallets /> : <SwapButton />}
            </div>
          </TabsContent>

          <TabsContent value="Limit" className="flex flex-col gap-2">
            <TokenInput
              label="Limit(Buy at)"
              token={limitBuyToken}
              amount={limitBuyAmount}
              onTokenChange={setLimitBuyToken}
              onAmountChange={setLimitBuyAmount}
            />
            <TokenInput
              label="You pay"
              token={limitPayToken}
              amount={limitPayAmount}
              onTokenChange={setLimitPayToken}
              onAmountChange={setLimitPayAmount}
            />
            <TokenInput
              label="You receive"
              token={limitBuyToken}
              amount={limitBuyAmount}
              onTokenChange={setLimitBuyToken}
              onAmountChange={setLimitBuyAmount}
            />

            <div className="flex justify-center items-center mt-5">
              {!connected ? <Wallets /> : <SwapButton />}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
      <div className="w-full">
        <hr className="w-[70vw] border-t-1 border-gray-500 m-auto mb-5 opacity-10" />
        <LimitOrder />
      </div>
    </div>
  );
};

export default SwapForm;
