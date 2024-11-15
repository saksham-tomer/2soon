import { Button } from "../ui/button";

export const CancelAllOrderButton = () => {
  return (
    <Button
      variant="destructive"
      className=" bg-red-900/50 h-10 gap-2 rounded-full pl-1.5 p-5 hover:bg-red-950/70 text-red-500 border-none"
    >
      Cancel all orders
    </Button>
  );
};
