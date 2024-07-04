"use client";
import Link from 'next/link';
import { GlareCard } from '../../components/ui/glare-card';
import { LuComputer, LuCalculator, LuBriefcase } from "react-icons/lu";

export default function Cards() {
  return (
    <div className='grid gap-3 md:flex'>
      <Link href={`./cards/menu/`}><GlareCard className="flex flex-col items-center justify-center">
        <LuComputer className='text-background w-1/3 h-1/3'/>
        <p className="text-background font-bold text-xl mt-4">MÓDULO OPERATIVO</p>
      </GlareCard>
      </Link>
      <GlareCard className="flex flex-col items-center justify-center">
        <LuCalculator className='text-background w-1/3 h-1/3'/>
        <p className="text-background font-bold text-xl mt-4">MÓDULO COMERCIAL</p>
      </GlareCard>
      <GlareCard className="flex flex-col items-center justify-center">
        <LuBriefcase className='text-background w-1/3 h-1/3'/>
        <p className="text-background font-bold text-xl mt-4">MÓDULO CONTABLE</p>
      </GlareCard>
    </div>
  );
}
