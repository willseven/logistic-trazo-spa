"use client"
import { api } from "@/lib/api";
import { TableTarifa } from "@/modules/matrizCotizaciones/components/TableTarifa";
import { ITarifa } from "@/modules/matrizCotizaciones/interface/tarifa";
import { useQuery } from "@tanstack/react-query";

export default function matrizTarifas() {
  let token: string | null = null;
  let id: string | null = null;

  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("token");
    id = window.localStorage.getItem("id");
  }

    const { data, isPending, isError, error } = useQuery({
      queryKey: ["matriz"],
      queryFn: async () => {
        const response = await api.get(`/Dropdown/matrizCotizaciones/options`, {
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
    console.log(data)
  return (
    <div>
      <h1 className="flex items-center justify-center font-bold text-xl">
        Matriz
      </h1>
      <section>
        <TableTarifa data={data ?? []} />
      </section>
    </div>
  );
}
