"use client";
import { api } from "@/lib/api";
import { useUserStore } from "@/lib/store";
import { TableProcedure } from "@/modules/ManageProcedures/components/Tableprocedures";
import { useQuery } from "@tanstack/react-query";

export default function ManageProcedures() {
  let token: string | null = null;
  let id: string | null = null;

  const { currentRole } = useUserStore((state) => ({
    currentRole: state.currentRole,
  }));
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("token");
    id = window.localStorage.getItem("id");
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["procedures"],
    queryFn: async () => {
      const response = await api.get(`/procedure/openprocedures`, {
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
    <h1 className="flex items-center justify-center font-bold text-xl">Trámites</h1>
    <section>
      <TableProcedure
        data={data ?? []} 
      />
    </section>
  </div>

  );
};
