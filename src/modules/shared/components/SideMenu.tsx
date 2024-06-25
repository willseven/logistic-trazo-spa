import { FaUser, FaBuilding, FaClipboardList, FaCogs, FaHistory } from 'react-icons/fa';
import Link from 'next/link';

export const SideMenu = () => {
  return (
    <div className="flex flex-col h-full">
      <nav className="flex flex-col flex-1 p-2">
        <Link href="#" className="flex items-center p-2  my-2 transition-colors duration-200 hover:bg-[#86c28b] rounded-md">
          <FaUser className="text-xl mr-4 " />
          Usuarios
        </Link>
        <Link href="#" className="flex items-center p-2 my-2   transition-colors duration-200 hover:bg-[#86c28b] rounded-md">
          <FaBuilding className="text-xl mr-4" />
          Compañías
        </Link>
        <Link href="#" className="flex items-center p-2 my-2   transition-colors duration-200 hover:bg-[#86c28b] rounded-md">
          <FaClipboardList className="text-xl mr-4" />
          Menus
        </Link>
        <Link href="#" className="flex items-center p-2 my-2  transition-colors duration-200 hover:bg-[#86c28b] rounded-md">
          <FaCogs className="text-xl mr-4" />
          Roles
        </Link>
        <Link href="#" className="flex items-center p-2 my-2  transition-colors duration-200 hover:bg-[#86c28b] rounded-md">
          <FaHistory className="text-xl mr-4" />
          Mi historial
        </Link>
      </nav>
    </div>
  );
};
