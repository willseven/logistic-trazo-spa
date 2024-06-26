"use client";
import { useUserStore } from "@/lib/store";
import { Rol } from "@/lib/types";
import Select from "react-select";
import { toast } from "sonner";
export default function RolesSelect() {
  const { roles, setCurrentRole } = useUserStore((state) => ({
    roles: state.roles,
    setCurrentRole: state.setCurrentRole,
  }));

  // const rolesOptions = roles.map((role) => {
  //   return {
  //     value: role.id,
  //     label: role.label,
  //   }
  // })

  // console.log(rolesOptions);

  function handleChange(selectedRole: Rol | null){
    setCurrentRole(selectedRole)
    toast(<div>{JSON.stringify(selectedRole)}</div>);
  }

  return (
    <Select
      options={roles}
      getOptionLabel={(role) => role.label}
      getOptionValue={(role) => role.id.toString()}
      onChange={(selectedOption) => handleChange(selectedOption as Rol)}
    />
  );
}
