"use client";
import { Suspense, useState } from "react";
import { api } from "@/lib/api";
import { TableManagement } from "../../../modules/dropdown-management/components/TableManagement";
import { useQuery } from "@tanstack/react-query";

const DropdownManagementComponent = () => {
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
    queryKey: ["dropdowns", pagination],
    queryFn: async () => {
      const response = await api.get(`/Dropdown/List`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const paginationHeader = JSON.parse(response.headers.pagination);
      setPagination((prev) => ({ ...prev, ...paginationHeader }));

      return response.data;
    },
    enabled: true,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${(error as Error).message}`;

  return (
    <div>
      <section>
        <TableManagement data={data ?? []} />
      </section>
    </div>
  );
};

const DropdownManagement = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DropdownManagementComponent />
    </Suspense>
  );
};

export default DropdownManagement;
