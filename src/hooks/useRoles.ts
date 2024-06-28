import { fetchRoles } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";

export function useRoles() {
  return useQuery({
    queryKey: ["Roles"],
    queryFn: fetchRoles,
  });
}
