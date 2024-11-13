"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownUp } from "lucide-react";
import TokenInput from "./tokenInput";
import Wallets from "../walletprovider/Wallets";
import { useWallet } from "@solana/wallet-adapter-react";
import { SwapButton } from "./SwapButton";

const SwapForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Swap" | "Limit">("Swap");
  const [selectedPayToken, setSelectedPayToken] = useState<string>("USDC");
  const [selectedReceiveToken, setSelectedReceiveToken] =
    useState<string>("ETH");
  const [payAmount, setPayAmount] = useState<string>("");
  const [receiveAmount, setReceiveAmount] = useState<string>("");

  const { connected } = useWallet();
  const handleSwapDirection = () => {
    setSelectedPayToken(selectedReceiveToken);
    setSelectedReceiveToken(selectedPayToken);
    setPayAmount(receiveAmount);
    setReceiveAmount(payAmount);
  };

  return (
    <div className="flex mt-5 p-5 items-center justify-center">
      <Card className="w-full max-w-md space-y-6 bg-gray-700/25 backdrop-blur-xl p-4 text-white/80 border-none rounded-3xl">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "Swap" | "Limit")}
          className="w-full"
        >
          <TabsList className="bg-neutral-950/15">
            <TabsTrigger value="Swap">Swap</TabsTrigger>
            <TabsTrigger value="Limit">Limit</TabsTrigger>
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
              token={selectedReceiveToken}
              amount={receiveAmount}
              onTokenChange={setSelectedReceiveToken}
              onAmountChange={setReceiveAmount}
            />
            <TokenInput
              label="You pay"
              token={selectedPayToken}
              amount={payAmount}
              onTokenChange={setSelectedPayToken}
              onAmountChange={setPayAmount}
            />
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
        </Tabs>
      </Card>
    </div>
  );
};

export default SwapForm;

