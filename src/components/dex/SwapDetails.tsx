import React from 'react';
import { Button } from '@/components/ui/button';

interface SwapDetailsProps {
  exchangeRate: number;
  slippageTolerance: number;
  minimumReceive: number;
  networkFee: number;
  onNetworkFeeEdit: () => void;
}

const SwapDetails: React.FC<SwapDetailsProps> = ({ exchangeRate, slippageTolerance, minimumReceive, networkFee, onNetworkFeeEdit }) => {
  return (
    <div className="space-y-3 rounded-lg bg-gray-800/50 p-4 text-sm">
      <div className="flex justify-between">
        <span>Exchange Rate</span>
        <span>{`1 ETH = ${exchangeRate.toFixed(2)} USDC (~$${exchangeRate.toFixed(2)})`}</span>
      </div>
      <div className="flex justify-between">
        <span>Slippage tolerance</span>
        <span>{`${slippageTolerance}% · Auto`}</span>
      </div>
      <div className="flex justify-between">
        <span>Minimum receive</span>
        <span>{`${minimumReceive.toFixed(6)} ETH ≈ (~$${minimumReceive.toFixed(6)})`}</span>
      </div>
      <div className="flex justify-between">
        <span>Network Fee</span>
        <div className="flex items-center gap-2">
          <Button variant="link" className="h-auto p-0 text-blue-400" onClick={onNetworkFeeEdit}>
            Edit
          </Button>
          <span>{`Market · ~$${networkFee.toFixed(2)}`}</span>
        </div>
      </div>
    </div>
  );
};

export default SwapDetails;
