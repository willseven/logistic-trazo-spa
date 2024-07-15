"use client";
import { Suspense } from "react";
import { api } from "@/lib/api";
import { useUserStore } from "@/lib/store";
import { TableProcedure } from "@/modules/ManageProcedures/components/Tableprocedures";
import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

function ManageProceduresComponent() {
  let token: string | null = null;
  let id: string | null = null;

  const { currentRole } = useUserStore((state) => ({
    currentRole: state.currentRole,
  }));
  
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("token");
    id = window.localStorage.getItem("id");
  }

  const { data, isLoading, isError, error } = useQuery({
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

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <div>
      <h1 className="flex items-center justify-center font-bold text-xl">Trámites</h1>
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

const ManageProceduresWrapper = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ManageProceduresComponent />
    </Suspense>
  );
};

export default function Page() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loading />}>
        <ManageProceduresWrapper />
      </Suspense>
    </ErrorBoundary>
  );
}
