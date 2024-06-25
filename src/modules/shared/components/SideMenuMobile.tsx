import { FaUser, FaBuilding, FaClipboardList, FaCogs, FaHistory } from 'react-icons/fa';
import { X } from 'lucide-react'; 
import Link from 'next/link';

export const SideMenuMobile = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 ">
        <span className="font-semibold text-xl">Noxun</span>
        <button onClick={() => setIsOpen(false)}>
          <X className="h-5 w-5" />
          <span className="sr-only">Close menu</span>
        </button>
      </div>
      <nav className="flex flex-col flex-1 p-2">
        <Link href="#" className="flex items-center p-2 my-2 transition-colors duration-200 hover:bg-blue-800 rounded-md" onClick={handleLinkClick}>
          <FaUser className="text-xl mr-4" />
          Usuarios
        </Link>
        <Link href="#" className="flex items-center p-2 my-2 transition-colors duration-200 hover:bg-blue-800 rounded-md" onClick={handleLinkClick}>
          <FaBuilding className="text-xl mr-4" />
          Compañías
        </Link>
        <Link href="#" className="flex items-center p-2 my-2 transition-colors duration-200 hover:bg-blue-800 rounded-md" onClick={handleLinkClick}>
          <FaClipboardList className="text-xl mr-4" />
          Menus
        </Link>
        <Link href="#" className="flex items-center p-2 my-2 transition-colors duration-200 hover:bg-blue-800 rounded-md" onClick={handleLinkClick}>
          <FaCogs className="text-xl mr-4" />
          Roles
        </Link>
        <Link href="#" className="flex items-center p-2 my-2 transition-colors duration-200 hover:bg-blue-800 rounded-md" onClick={handleLinkClick}>
          <FaHistory className="text-xl mr-4" />
          Mi historial
        </Link>
      </nav>
    </div>
  );
};
