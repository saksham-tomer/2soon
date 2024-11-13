import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavItems } from "./NavItems";
export function MobileNavItems() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="text-black backdrop-blur-xl opacity-70 cursor-pointer" size="icon">
          <RxHamburgerMenu />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-black text-white">
      <NavItems /> 
      </SheetContent>
    </Sheet>
  );
}
