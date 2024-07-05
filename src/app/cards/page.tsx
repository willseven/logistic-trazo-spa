"use client";
import { Boxes } from "@/components/ui/background-boxes";
import Cards from "../../modules/cards/Cards";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function CardsPage() {
  return (
   
    <main className="flex items-center justify-center min-h-screen h-auto overflow-auto">
    <div className="relative w-full min-h-screen h-auto overflow-hidden bg-primary flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="absolute top-0 left-0 p-4 z-20 w-full flex justify-center md:justify-start">
        <div className="hidden md:block">
          <Image src="/images/noxun.jpg" width={200} height={100} alt="logo" />
        </div>
        <div className="flex md:hidden text-white text-4xl font-extrabold text-center items-center justify-center w-full mt-20">
          Trazo Logístico
        </div>
      </div>
      <div className="text-center mt-8 relative z-20 w-full flex flex-col items-center">
        <Cards />
      </div>
    </div>
  </main>
  
      );
    
}
