import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LinkButtonsProps {
  children: React.ReactNode;
  cont: React.ReactNode;
  className?: string;
}

export default function ToolButton({ children, cont, className }: LinkButtonsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={`border-rauno text-rauno border p-1 rounded-lg hover:opacity-70 transition ease-in-out ${className}`}>
          {children}
        </button>
      </DialogTrigger>
      <DialogContent className={`bg-darkpaco ${className}`}>{cont}</DialogContent>
    </Dialog>
  );
}
