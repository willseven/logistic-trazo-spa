"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from 'next/image'
import Link from "next/link";
import { useEffect, useState } from "react";
import { SideMenu } from "../../modules/shared/components/SideMenu";
import RolesSelect from "./RolesSelect";
import { useUserStore } from "@/lib/store";
import { useMenuList } from "@/hooks/useMenuList";
import img from "../../images/noxun.jpg";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { currentRole, setMenuList } = useUserStore((state) => ({
    currentRole: state.currentRole,
    setMenuList: state.setMenuList,
  }));

  const { data: roleMenu } = useMenuList(currentRole?.id.toString());
  const router = useRouter();
  useEffect(() => {
    if (roleMenu) {
      setMenuList(roleMenu.menuList);
    }
  }, [roleMenu, setMenuList]);

  return (
    <>
      {/* Header */}
      <nav className="shadow-lg border-gray-200 fixed z-30 w-full bg-primary">
        <div className="px-2 py-2 lg:px-5 lg:pl-3">
          <div className="grid grid-cols-4 items-center">
            <div className="flex items-center justify-start">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden mr-2 p-2 rounded">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-2/3">
                  <SheetHeader>
                    <SheetTitle>Menú</SheetTitle>
                  </SheetHeader>
                  <div className="pt-5 ">
                    <SideMenu />
                  </div>
                  
                </SheetContent>
              </Sheet>
              <div className="hidden lg:block">
              <Link href="#" className="text-xl font-bold flex items-center lg:ml-2.5">
                <Image src={img} width={100} height={50} alt="Logo" />
              </Link>
              </div>
            </div>
            <div className="flex col-span-2 justify-start">
              <RolesSelect />
            </div>
            <div className="flex items-center justify-end">
              <Button className="p-2 rounded-full w-12 h-12 flex items-center justify-center shrink-0"
                variant="outline"
                size="icon"
                onClick={() => setIsProfileOpen(!isProfileOpen)}>
                NX
              </Button>
              {isProfileOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-48 border rounded shadow-lg">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-secondary"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("id");
                      router.push("../auth/login");
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
      <div className="flex overflow-hidden pt-16 ">
        <aside id="sidebar" className=" fixed hidden z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
          <div className="ml-2 shadow-2xl border-r bg-background relative flex-1 flex flex-col min-h-0 pt-0">
            <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="flex-1 px-3 pt-5 divide-y space-y-1">
                <ul className="space-y-2 pb-2">
                  <SideMenu />
                </ul>
              </div>
            </div>
          </div>
        </aside>
        <div id="main-content" className="h-full w-full bg-background relative overflow-y-auto lg:ml-64">
          <main>
            <div className="pt-6 px-4 rounded-xl ">
              <div className="w-full min-h-[calc(100vh-110px)]">
                <div className="bg-background drop-shadow-2xl rounded-lg p-4 sm:p-6 xl:p-8">
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
