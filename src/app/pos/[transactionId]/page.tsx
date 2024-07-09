import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  BitcoinIcon,
  EclipseIcon,
  PrinterIcon,
  SettingsIcon,
  WalletIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";

async function fetchTransaction(id: string) {
  const res = await fetch(
    process.env.__NEXT_PRIVATE_ORIGIN + "/api/invoice?id=" + id
  );
  if (!res.ok) return undefined;
  return res.json();
}

async function POS({ params }: { params: { transactionId: string } }) {
  const transation = await fetchTransaction(params.transactionId);
  if (!transation) {
    return <div>Transaction not found</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Crypto POS</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SettingsIcon className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <PrinterIcon className="mr-2 h-4 w-4" />
                Print Receipt
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <WalletIcon className="mr-2 h-4 w-4" />
                Manage Wallets
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid gap-4">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold">{transation.amount}</div>
            <p className="text-muted-foreground">Total Amount</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/qr-code.png"
              alt="QR Code"
              width={160}
              height={160}
              priority
              className="h-auto w-auto rounded-md"
            />
            <p className="text-muted-foreground">Scan to Pay</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Button variant="outline">
              <BitcoinIcon className="h-5 w-5" />
              <span className="sr-only">Bitcoin</span>
            </Button>
            <Button variant="outline">
              <EclipseIcon className="h-5 w-5" />
              <span className="sr-only">Ethereum</span>
            </Button>
            <Button variant="outline">
              <BitcoinIcon className="h-5 w-5" />
              <span className="sr-only">Litecoin</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default POS;
