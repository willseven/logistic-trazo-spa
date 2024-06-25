"use client"
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { SideMenu } from '../../modules/shared/components/SideMenu';
import { SideMenuMobile } from '@/modules/shared/components/SideMenuMobile';

export default function Dashboard({children}: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar para dispositivos grandes */}
      <div className="hidden bg-muted/40 md:block">
        <div className="flex h-full max-h-screen bg-[#6da67a] flex-col gap-2">
          <div className="flex h-14 items-center  px-4 justify-between lg:h-[60px] lg:px-6 ">
            <Link href="#" className="flex items-center gap-2 font-semibold">
              <span className="text-xl">Noxun</span>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <SideMenu />
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col">
        {/* Header para dispositivos móviles */}
        <header className="flex h-14 items-center gap-4 bg-gradient-to-r from-[#6da67a] to-[#86c28b]  px-4 lg:h-[80px] lg:px-6 justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 px-10"
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
              >
                <span className="text-xl">Roles</span>
              </Button>
              {isOptionsOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 w-48 bg-white border rounded shadow-lg">
                  <Link href="/option1" className="block px-4 py-2 hover:bg-gray-200">Opción 1</Link>
                  <Link href="/option2" className="block px-4 py-2 hover:bg-gray-200">Opción 2</Link>
                  <Link href="/option3" className="block px-4 py-2 hover:bg-gray-200">Opción 3</Link>
                </div>
              )}
            </div>
          </div>
          
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="shrink-0"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Toggle profile menu</span>
            </Button>
            {isProfileOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-48  border rounded shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 bg-white hover:bg-gray-200"
                  onClick={() => { /* Lógica para cerrar sesión */ }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
          
          {/* Menu desplegable para móviles */}
          {isOpen && (
            <div className="absolute left-0 top-0 z-50 w-64 h-full bg-[#6da67a] md:hidden">
              <SideMenuMobile setIsOpen={setIsOpen} />
            </div>
          )}
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
