import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { HoverEffectStep } from './hoverEffect';

interface Step {
  id: number;
  name: string;
}

export const ListStep = (props: { procedureTypeId: number }) => {
  const { procedureTypeId } = props;
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const { data, isLoading, isError, error } = useQuery<Step[]>({
    queryKey: ["processSteps", procedureTypeId],
    queryFn: async () => {
      const response = await api.get(
        `/processstep/GetProcessStepsByProcedureTypeId/${procedureTypeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 10, // Volver a hacer fetch luego de 10 min
  });
  console.log(data);

  return (
    <div className="flex flex-col items-center mt-5">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error?.message}</div>}
      {data && (
        <div className="flex flex-col items-center">
          <HoverEffectStep items={data}/>
          {/* {data ? data.map((step) => <h1 key={step.id}>{step.name}</h1>) : null} */}
        </div>
      )}
    </div>
  );
};
