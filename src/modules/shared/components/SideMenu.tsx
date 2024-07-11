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
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname, useSearchParams,} from "next/navigation";
import { BsArrowUpRightSquareFill, BsArrowUpRightSquare } from "react-icons/bs";

export const SideMenu = () => {
  // const { menuList, currentRole } = useUserStore((state) => ({
  //   menuList: state.menuList,
  //   currentRole: state.currentRole,
  // }));
  const pathname = usePathname();
  const params = useSearchParams();
  const currentStep = params.get("step");
  const menuList = useStore(useUserStore, (state) => state.menuList);
  const currentRole = useStore(useUserStore, (state) => state.currentRole);
  const [currentRoleisReady, setcurrentRoleisReady] = useState(false);

  useEffect(() => {
    if (currentRole != undefined) {
      setcurrentRoleisReady(true);
    }
  }, [currentRole]);




  const { data, isLoading, isPending, isError, error } = useQuery({
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

  if (isLoading || isPending) return "Loading";
  // console.log("pasos", data);
  return (
    <div className="flex flex-col h-full">
      <nav className="flex flex-col flex-1 p-2">
        <ul>
          {menuList?.map((menuItem) => (
            <li key={menuItem.id}>
              <div className="flex gap-4">
              {pathname.includes(menuItem.name) ? (
                <BsArrowUpRightSquareFill className="h-5 w-5 text-center mt-2" />
              ) : (
                <BsArrowUpRightSquare className="h-5 w-5 text-center mt-2" />
              )}
              <Link
                className={`flex items-center p-2 rounded-md hover:bg-gray-200 ${
                  pathname.includes(menuItem.name) ? 'bg-gray-300' : '' 
                }`}
                href={`/dashboard/${menuItem.name}`}
                >
                {menuItem.label}
                
              </Link>
                  </div>
            </li>
          ))}
        </ul>
        <ul>
          {data.length > 0 &&
            data.map((typeofsteps: any) => {
              if (typeofsteps.processSteps.length > 0) {
                
                return (
                  <Accordion type="single" collapsible key={typeofsteps.name}>
                    <AccordionItem value={typeofsteps.name}>
                      <AccordionTrigger>{typeofsteps.name}</AccordionTrigger>
                      <ul>
                        {typeofsteps.processSteps.map((process: any) => {
                          const isCurrentStep = currentStep === process.step.toString();
                          return (
                            <li key={process.id}>
                              <Link href={`/dashboard/ManageProcedures/step?step=${process.step}&id=${typeofsteps.id}&currentRoleId=${currentRole?.id}`}>
                                <AccordionContent
                                  className={`hover:bg-gray-200 rounded-md ${isCurrentStep ? 'bg-gray-300' : ''}`}
                                >
                                  <div className="flex  gap-2 justify-center py-1">
                                    {/* <div>{process.step}.</div> */}
                                    <div>{process.name}</div>
                                  </div>
                                </AccordionContent>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionItem>
                  </Accordion>
                );
              }
            })}
        </ul>

        {/* <ul>
          {data.map((step: any) => {
            return step.processSteps.map((process: any) => {
              return <li key={process.id}>{process.name}</li>;
            });
          })}
        </ul> */}
      </nav>
      {/* <PageTheme /> */}
    </div>
  );
};
