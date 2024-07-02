"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { TableUsers } from "@/modules/usersManagement/components/TableUsers";
import { IUser } from "@/modules/usersManagement/interface/users";
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import { TableManagement } from '../../../modules/dropdown-management/components/TableManagement';


const DropdownManagement = () => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  
  const [pagination, setPagination] = useState({
    currentPage: 1, 
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 1,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["usersAll", pagination],
    queryFn: async () => {
      const response = await api.get(`/Dropdown/List`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      
      return response.data;
    },
    
    enabled: true,
    staleTime: 1000 * 60 * 10, // Volver a hacer fetch luego de 10 min
});

// const paginationHeader = JSON.parse(response.headers.pagination);
// setPagination(prev => ({ ...prev, ...paginationHeader }));
  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <div>
      {/* <h1 className="flex items-center justify-center font-bold text-xl">Gestión de Usuarios</h1> */}
      <section>
        
        <TableManagement
          data={data ?? []} 
       
        />
      </section>
    </div>
  );
};

export default DropdownManagement;
