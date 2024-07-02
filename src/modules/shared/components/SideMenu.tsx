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
import PageTheme from '../../../app/dashboard/theme/page';

export const SideMenu = () => {
  const { menuList } = useUserStore((state) => ({
    menuList: state.menuList,
  }));
  // console.log(menuList);

  return (
    <div className="flex flex-col h-full">
      <nav className="flex flex-col flex-1 p-2">
       
        <ul>
          {menuList.map((menuItem) => (
            
            <li key={menuItem.id}>
              <Link className="flex items-center p-2 hover:bg-gray-200 rounded-md" href={`/dashboard/${menuItem.name}`}>
                  {menuItem.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <PageTheme/>
    </div>
  );
};
