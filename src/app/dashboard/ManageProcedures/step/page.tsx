"use client";
import { api } from "@/lib/api";
import { useUserStore } from "@/lib/store";
import { TableProcedure } from "@/modules/ManageProcedures/components/Tableprocedures";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

export default function ManageProcedures() {
  let token: string | null = null;
  let id: string | null = null;
  const router= useRouter();
  const params = useSearchParams()
  const step = params.get("step");
  const typeid = params.get("id");
  const currentRoleId = params.get("currentRoleId");

  const { currentRole } = useUserStore((state) => ({
    currentRole: state.currentRole,
  }));
  console.log(currentRole)
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("token");
    id = window.localStorage.getItem("id");
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["stepprocedure"],
    queryFn: async () => {
      const response = await api.get(`/procedure/bystepbyproceduretypeid/${step}/proceduretypeid/${typeid}/rol/${currentRoleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

   

      return response.data;
    },
    
    enabled: true,
    staleTime: 1000 * 60 * 10, // Volver a hacer fetch luego de 10 min
  });
  if (isPending) return "Pending...";
  if (isError) return `Error: ${error.message}`;
  console.log(data);
  



  return (
    <div>
    <h1 className="flex items-center justify-center font-bold text-xl">Roles</h1>
    <section>
      <TableProcedure
        data={data ?? []} 
      />
    </section>
  </div>

  );
};
