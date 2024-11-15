import { create } from "zustand";

interface SwapState {
  selectedPayToken: string;
  selectedReceiveToken: string;
  payAmount: number;
  receiveAmount: number;
  handleSwapDirection: () => void;
}

interface LimitState {
  limitBuyToken: string;
  limitBuyAmount: number;
  limitPayToken: string;
  limitPayAmount: number;
}

interface AppState extends SwapState, LimitState {
  activeTab: "Swap" | "Limit";
  setActiveTab: (tab: "Swap" | "Limit") => void;
  setSelectedPayToken: (token: string) => void;
  setSelectedReceiveToken: (token: string) => void;
  setPayAmount: (amount: number) => void;
  setReceiveAmount: (amount: number) => void;
  setLimitBuyToken: (token: string) => void;
  setLimitBuyAmount: (amount: number) => void;
  setLimitPayToken: (token: string) => void;
  setLimitPayAmount: (amount: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial states
  selectedPayToken: "USDC",
  selectedReceiveToken: "ETH",
  payAmount: 0,
  receiveAmount: 0,
  limitBuyToken: "ETH",
  limitBuyAmount: 0,
  limitPayToken: "USDC",
  limitPayAmount: 0,
  activeTab: "Swap",

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedPayToken: (token) => set({ selectedPayToken: token }),
  setSelectedReceiveToken: (token) => set({ selectedReceiveToken: token }),
  setPayAmount: (amount) => set({ payAmount: amount }),
  setReceiveAmount: (amount) => set({ receiveAmount: amount }),
  setLimitBuyToken: (token) => set({ limitBuyToken: token }),
  setLimitBuyAmount: (amount) => set({ limitBuyAmount: amount }),
  setLimitPayToken: (token) => set({ limitPayToken: token }),
  setLimitPayAmount: (amount) => set({ limitPayAmount: amount }),

  handleSwapDirection: () =>
    set((state) => ({
      selectedPayToken: state.selectedReceiveToken,
      selectedReceiveToken: state.selectedPayToken,
      payAmount: state.receiveAmount,
      receiveAmount: state.payAmount,
    })),
}));
