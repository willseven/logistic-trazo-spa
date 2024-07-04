import { Rol } from "@/lib/types";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useUserStore } from "@/lib/store";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export const HoverEffect = ({
  items,
  className,
}: {
  items: Rol[] | null;
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();

  const responseMenu = async (id: number): Promise<any[]> => {
    try {
      console.log("ID:", id);
      const roleMenuResponse: any = await api.get(`/Rol/${id}/Menu`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Response:", roleMenuResponse);

      const menuList = roleMenuResponse.data.menuList || [];
      console.log("Menu List:", menuList);
      return menuList;
    } catch (error) {
      console.error("Error fetching menu:", error);
      return []; // Devuelve un array vacío en caso de error
    }
  };

  const redirectToFirstMenuItem = async (id: number) => {
    try {
      const menus = await responseMenu(id);
      console.log("Menus:", menus);
      if (menus && menus.length > 0) {
        const firstItemUrl = menus[0].name;
        router.push(`../dashboard/${firstItemUrl}`);
      } else {
        console.error("No hay items en el menú");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items?.map((item, idx) => (
        <div
          onClick={() => redirectToFirstMenuItem(item?.id)} // Aquí está la corrección
          key={item?.name}
          className="relative group block p-2 h-full w-full cursor-pointer"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.label}</CardTitle>
            <CardDescription>Rol {idx + 1}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full px-15 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 flex items-center justify-center",
        className
      )}
    >
      <div className="relative z-50 text-center">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-zinc-100 font-bold tracking-wide mt-4 text-2xl",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 text-zinc-400 tracking-wide leading-relaxed text-lg",
        className
      )}
    >
      {children}
    </p>
  );
};
