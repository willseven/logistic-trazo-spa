"use client";
import {
  FaUser,
  FaBuilding,
  FaClipboardList,
  FaCogs,
  FaHistory,
} from "react-icons/fa";
import Link from "next/link";
import { useUserStore } from "@/lib/store";
import PageTheme from "../../../app/dashboard/theme/page";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import useStore from "@/hooks/useStore";
import { useState, useEffect } from 'react';

export const SideMenu = () => {
  // const { menuList, currentRole } = useUserStore((state) => ({
  //   menuList: state.menuList,
  //   currentRole: state.currentRole,
  // }));
 
  const  menuList = useStore(useUserStore,(state)=> state.menuList);
  const  currentRole = useStore(useUserStore,(state)=> state.currentRole);
  const [currentRoleisReady, setcurrentRoleisReady] = useState(false);

  useEffect(() => {
    if(currentRole != undefined){
      setcurrentRoleisReady(true);
    }
  
  }, [currentRole])
  
  
  const { data, isLoading, isPending,isError, error } = useQuery({
    queryKey: ["stepsAll"],
    queryFn: async () => {
      const response = await api.get(
        `/proceduretype/stepsperrol/${currentRole?.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data;
    },

    enabled: currentRoleisReady,
    staleTime: 1000 * 60 * 10, // Volver a hacer fetch luego de 10 min
  });

  if(isLoading || isPending) return 'Loading';
  console.log("pasos", data);
  return (
    <div className="flex flex-col h-full">
      <nav className="flex flex-col flex-1 p-2">
        <ul>
          {menuList?.map((menuItem) => (
            <li key={menuItem.id}>
              <Link
                className="flex items-center p-2 hover:bg-gray-200 rounded-md"
                href={`/dashboard/${menuItem.name}`}
              >
                {menuItem.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          { data.map((step:any)=>{
            return step.processSteps.map((process:any)=>{
              return (<li key= {process.id}>

                 {process.name}
              </li>)
            })
          })
            
          }
        </ul>
      </nav>
      {/* <PageTheme /> */}
    </div>
  );
};
