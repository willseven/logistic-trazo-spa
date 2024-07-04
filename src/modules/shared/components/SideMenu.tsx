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

export const SideMenu = () => {
  const { menuList, currentRole } = useUserStore((state) => ({
    menuList: state.menuList,
    currentRole: state.currentRole,
  }));

  const { data, isLoading, isError, error } = useQuery({
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

    enabled: true,
    staleTime: 1000 * 60 * 10, // Volver a hacer fetch luego de 10 min
  });

  // console.log("pasos", steps);

  return (
    <div className="flex flex-col h-full">
      <nav className="flex flex-col flex-1 p-2">
        <ul>
          {menuList.map((menuItem) => (
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
          {/* {steps?.map((step: any) => {
            <li>
              {step}
              {() => console.log("es ", step)}
            </li>;
          })} */}
        </ul>
      </nav>
      <PageTheme />
    </div>
  );
};
