
"use client"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const token = localStorage.getItem("token");
const UserManagement = () => {
  
  const usersQuery = useQuery({
    queryKey: ["usersAll"],
    queryFn: async () =>
      await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/ListUsers`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    enabled: true,
    staleTime: 1000 * 60 * 10, //volver a hacer fetch luego de 10 min
  });

  // if (usersQuery.isLoading || usersQuery.isPending) {
  //   return (
  //     <div className="flex items-center space-x-4">
  //       <Skeleton className="h-12 w-12 rounded-full" />
  //       <div className="space-y-2">
  //         <Skeleton className="h-4 w-[250px]" />
  //         <Skeleton className="h-4 w-[200px]" />
  //       </div>
  //     </div>
  //   );}



  return (
    <div>page</div>
  )
};

export default  UserManagement;