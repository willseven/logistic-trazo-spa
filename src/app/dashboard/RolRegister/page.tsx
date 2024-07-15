"use client";
import React, { Suspense, useState, cache } from "react";
import { api } from "@/lib/api";
import { TableRol } from "../../../modules/RolRegister/components/TableRol";
import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

const RolRegisterComponent = cache(() => {
  let token: string | null = null;
  let id: string | null = null;

  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("token");
    id = window.localStorage.getItem("id");
  }

  const { data, isLoading, isError, error } = useQuery({
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
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <h1 className="flex items-center justify-center font-bold text-xl">
        Roles
      </h1>
      <section>
        <TableRol data={data ?? []} />
      </section>
    </div>
  );
});

const Loading = () => <div>Loading...</div>;
const ErrorFallback = ({ error }: { error: Error }) => (
  <div>Error: {error.message}</div>
);

export default function Page() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loading />}>
        <RolRegisterComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
