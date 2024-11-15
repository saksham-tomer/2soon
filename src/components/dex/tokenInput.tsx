import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TokenInputProps {
  label: string;
  token: string;
  amount: number;
  onTokenChange: (token: string) => void;
  onAmountChange: (amount: number) => void;
}

const TokenInput: React.FC<TokenInputProps> = ({
  label,
  token,
  amount,
  onTokenChange,
  onAmountChange,
}) => {
  return (
    <div className="space-y-2 rounded-3xl bg-neutral-950 p-4">
      <Label className="text-sm text-gray-400">{label}</Label>
      <div className="flex items-center justify-between gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="p-0 hover:bg-black hover:text-white"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                  <span className="text-sm font-semibold">{token[0]}</span>
                </div>
                <span className="font-semibold">{token}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => onTokenChange("USDC")}>
              USDC
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onTokenChange("ETH")}>
              ETH
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onTokenChange("SOL")}>
              SOL
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(Number(e.target.value))}
          className="w-1/2 border-none bg-transparent text-right text-xl md:text-2xl lg:text-4xlfocus-visible:ring-0" // Increased font size
          placeholder="0"
          style={{ direction: "rtl" }}
        />
      </div>
    </div>
  );
};

export default TokenInput;
