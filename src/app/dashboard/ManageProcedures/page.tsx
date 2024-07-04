"use client"
import { useUserStore } from "@/lib/store";


export default function ManageProcedures  ()  {

    const { currentRole} = useUserStore((state) => ({
        currentRole: state.currentRole,
      }));
    
  return (
    <div>page</div>
  )
};

