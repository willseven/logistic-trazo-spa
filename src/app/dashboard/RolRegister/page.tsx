"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { TableUsers } from "@/modules/usersManagement/components/TableUsers";
import { IUser } from "@/modules/usersManagement/interface/users";
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import { TableRol } from '../../../modules/RolRegister/components/TableRol';

const RolRegister = () => {
  const token = localStorage.getItem("token");
  // const id = localStorage.getItem("id");


  const { data, isPending, isError, error } = useQuery({
    queryKey: ["Rols"],
    queryFn: async () => {
      const response = await api.get(`/rol`, {
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
      <h1 className="flex items-center justify-center font-bold text-xl">Roles</h1>
      <section>
        <TableRol
          data={data ?? []} 
        />
      </section>
    </div>
  );
};

export default RolRegister;
