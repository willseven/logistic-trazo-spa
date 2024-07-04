"use client";
import { Boxes } from "@/components/ui/background-boxes";
import Cards from "../../modules/cards/Cards";
import { cn } from "@/lib/utils";

export default function CardsPage() {
  return (
    <main className="flex items-center justify-center min-h-screen h-auto overflow-auto">
      <div className="relative w-full min-h-screen h-auto overflow-hidden bg-primary flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        <h1 className={cn("md:text-6xl text-3xl text-white relative z-20 text-center")}>
          Trazo Logístico
        </h1>
        <div className="text-center mt-8 relative z-20 w-full flex flex-col items-center">
          <Cards />
        </div>
      </div>
    </main>
  );
}
