"use client";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { TableProcedures } from "../../../modules/ProcedureTypes/components/TableProcedure";
import { useQuery } from "@tanstack/react-query";

const ProcedureTypes = () => {
  let token: string | null = null;
  let id: string | null = null;

  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("token");
    id = window.localStorage.getItem("id");
  }

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 1,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["usersAll", pagination],
    queryFn: async () => {
      const response = await api.get(`procedureType`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const paginationHeader = JSON.parse(response.headers.pagination);
      setPagination((prev) => ({ ...prev, ...paginationHeader }));

      return response.data;
    },
    enabled: true,
    staleTime: 1000 * 60 * 10, // Volver a hacer fetch luego de 10 min
  });

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <div>
      {/* <h1 className="flex items-center justify-center font-bold text-xl">Gestión de Usuarios</h1> */}
      <section>
        <TableProcedures
          data={data ?? []}
          pagination={pagination}
          setPagination={setPagination}
        />
      </section>
    </div>
  );
};

const ProcedureTypesWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProcedureTypes />
    </Suspense>
  );
};

export default ProcedureTypesWrapper;
