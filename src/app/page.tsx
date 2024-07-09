import { Button } from "@/components/ui/button";
import { Bitcoin, MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import React from "react";

function EmbedWithScript() {
  const cartItems = [
    {
      id: 1,
      image: "/chair.jpg",
      title: "Cozy Blanket",
      quantity: 2,
      price: 29.99,
    },
    {
      id: 2,
      image: "/chair.jpg",
      title: "Autumn Mug",
      quantity: 1,
      price: 12.99,
    },
    {
      id: 3,
      image: "/chair.jpg",
      title: "Fall Fragrance Candle",
      quantity: 1,
      price: 16.99,
    },
  ];
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">Cart</h1>
      <div className="grid gap-8">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[100px_1fr_100px] items-center gap-4"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={100}
              height={100}
              priority
              className="rounded-lg object-cover h-auto w-auto"
            />
            <div className="grid gap-1">
              <h3 className="font-semibold">{item.title}</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span>{item.quantity}</span>
                <Button variant="outline" size="icon">
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-right font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t pt-8 mt-8 flex justify-between items-center">
        <div className="text-2xl font-bold">Total: ${total.toFixed(2)}</div>
        <a
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8"
          href="/pos"
          id="conditionalLink"
          data-amount={total.toFixed(2)}
        >
          <Bitcoin className="h-6 w-6 mr-2" />
          Pay with Crypto
        </a>
      </div>
      <Script src="/embed.js" />
    </div>
  );
}

export default EmbedWithScript;
