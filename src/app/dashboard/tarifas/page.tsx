"use client";
import { Suspense, useState } from "react";
import { api } from "@/lib/api";
import { TableTarifa } from "@/modules/matrizCotizaciones/components/TableTarifa";
import { ITarifa } from "@/modules/matrizCotizaciones/interface/tarifa";
import { useQuery } from "@tanstack/react-query";

export default function MatrizTarifasPage() {
  let token: string | null = null;
  let id: string | null = null;

  if (typeof window !== "undefined") {
    id = window.localStorage.getItem("id");
    token = window.localStorage.getItem("token");
  }

  const { data, isLoading, isError, error } = useQuery<ITarifa[]>({
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
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${(error as Error).message}`;
  console.log(data);

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

export default function MatrizTarifas() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MatrizTarifasComponent />
    </Suspense>
  );
}
