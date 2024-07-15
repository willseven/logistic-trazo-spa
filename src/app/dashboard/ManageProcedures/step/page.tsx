"use client";
import { Suspense } from "react";
import { api } from "@/lib/api";
import { TableProcedure } from "@/modules/ManageProcedures/components/Tableprocedures";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary"; // Asegúrate de tener react-error-boundary instalado

function ManageProceduresComponent() {
  const params = useSearchParams();
  const step = params.get("step");
  const typeid = params.get("id");
  const currentRoleId = params.get("currentRoleId");

  const token = typeof window !== "undefined" ? window.localStorage.getItem("token") : null;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["stepprocedure", step, typeid, currentRoleId],
    queryFn: async () => {
      const response = await api.get(`/procedure/bystepbyproceduretypeid/${step}/proceduretypeid/${typeid}/rol/${currentRoleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    enabled: Boolean(step && typeid && currentRoleId),
    staleTime: 1000 * 60 * 10, // Volver a hacer fetch luego de 10 min
  });

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${(error as Error).message}`;

  return (
    <div>
      <h1 className="flex items-center justify-center font-bold text-xl">Cotizaciones</h1>
      <section>
        <TableProcedure data={data ?? []} />
      </section>
    </div>
  );
}

function Loading() {
  return <div>Loading...</div>;
}

function ErrorFallback({ error }: { error: Error }) {
  return <div>Error: {error.message}</div>;
}

function ManageProceduresWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <ManageProceduresComponent />
    </Suspense>
  );
}

export default function Page() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loading />}>
        <ManageProceduresWrapper />
      </Suspense>
    </ErrorBoundary>
  );
}
