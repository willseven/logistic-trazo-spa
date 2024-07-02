"use client";
import { useUserStore } from "@/lib/store";
import { Rol } from "@/lib/types";
import Select from "react-select";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RolesSelect() {
  const { roles, setCurrentRole, setMenuList } = useUserStore((state) => ({
    roles: state.roles,
    setCurrentRole: state.setCurrentRole,
    setMenuList: state.setMenuList,
  }));

  const router = useRouter();

  async function handleChange(selectedRole: Rol | null) {
    if (selectedRole) {
      setCurrentRole(selectedRole);

      try {
        const response = await api.get(`/Rol/${selectedRole.id}/Menu`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const menuList = response.data.menuList;
        setMenuList(menuList);

        if (menuList.length > 0) {
          router.push(`../dashboard/${menuList[0].name}`);
        } else {
          toast.error("El rol seleccionado no tiene menús disponibles.");
        }
      } catch (error) {
        console.error("Error al obtener el menú:", error);
        toast.error("Error al obtener el menú del rol seleccionado.");
      }
    }
  }

  return (
    <Select className="w-3/5"
      options={roles}
      getOptionLabel={(role) => role.label}
      getOptionValue={(role) => role.id.toString()}
      onChange={(selectedOption) => handleChange(selectedOption as Rol)}
    />
  );
}
