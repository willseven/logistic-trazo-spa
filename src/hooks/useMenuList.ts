import { api } from "@/lib/api";
import { useUserStore } from "@/lib/store";
import { RoleMenu } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useMenuList(roleId:string | undefined){

  const {token} = useUserStore((state) => ({
    token: state.userResponse.token
  }))

  return useQuery({
    queryKey: ["menuList", roleId],
    queryFn: async (): Promise<RoleMenu | undefined> => {
      const response = await api.get(`/Rol/${roleId}/Menu`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    },
    enabled: !!roleId
  })
}