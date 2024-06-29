"use client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from 'next/image'
import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


import { SideMenu } from "../../modules/shared/components/SideMenu";
import { SideMenuMobile } from "@/modules/shared/components/SideMenuMobile";
import RolesSelect from "./RolesSelect";
import { useUserStore } from "@/lib/store";
import { useMenuList } from "@/hooks/useMenuList";
import img from "../../images/noxun.jpg";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const { currentRole, setMenuList } = useUserStore((state) => ({
    currentRole: state.currentRole,
    setMenuList: state.setMenuList,
  }));

  const { data: roleMenu } = useMenuList(currentRole?.id.toString());

  useEffect(() => {
    if (roleMenu) {
      setMenuList(roleMenu.menuList);
    }
  }, [roleMenu, setMenuList]);

  return (
  <>
    {/* Header */}
      <nav className="bg-[#4D44B5]  border-gray-200 fixed z-30 w-full">
        <div className="px-2 py-2 lg:px-5 lg:pl-3">
          {/* <div className="flex items-center justify-between"> */}
          <div className="grid grid-cols-3 items-center">
            <div className="flex items-center justify-start">
              <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
                <svg id="toggleSidebarMobileClose" className="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
              <Link href="#" className="text-xl font-bold flex items-center lg:ml-2.5">
                {/* Logo */}
                
                {/* <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6">
                  <rect width="256" height="256" fill="none"></rect>
                  <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                  <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                </svg> */}
                <span className=" whitespace-nowrap text-white">
                <Image
                  src={img}
                  width={100}
                  height={50}
                  alt="Picture of the author"
                />
                </span>
              </Link>
            </div>  
            <div>
              
              <div className="">
                <RolesSelect />
              </div>
            </div>

            <div className="flex items-center justify-end">
              {/* User Avatar */}
              <Button className="bg-[#4D44B5] text-white p-2 rounded-full w-12 h-12 flex items-center justify-center shrink-0"
              variant="outline"
              size="icon"
              onClick={() => setIsProfileOpen(!isProfileOpen)}>
                NX
              </Button>
              {isProfileOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-48  border rounded shadow-lg">
                  <button
                    className="block w-full text-left px-4 py-2 bg-white hover:bg-gray-200"
                    onClick={() => {

                    }}
                  >
                    Cerrar sesión
                  </button>
                </div>
               )}
            </div>
          </div>
        </div>
      </nav>


  {/* ASIDE */}

  <div className="flex overflow-hidden bg-white pt-16">
        <aside
          id="sidebar"
          className="fixed hidden z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
          aria-label="Sidebar"
        >
          <div className="relative flex-1 flex flex-col min-h-0  border-[#4D44B5] bg-white pt-0">
            <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="flex-1 px-3 pt-5 bg-[#4D44B5] divide-y space-y-1">
                <ul className="space-y-2 pb-2">
                  <SideMenu/>
                </ul>
              </div>
            </div>
          </div>
        </aside>
        <div
          className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
          id="sidebarBackdrop"
        ></div>
        <div
          id="main-content"
          className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
        >
          <main>
            <div className="pt-6 px-4 rounded">
              <div className="w-full min-h-[calc(100vh-230px)]">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                  {children}
                </div>
              </div>
            </div>
          </main>
          
        </div>
      </div>
  </>
  );
}
