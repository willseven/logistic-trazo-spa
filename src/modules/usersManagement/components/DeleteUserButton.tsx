"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useUserStore } from "@/lib/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function DeleteUserButton({ id }: { id: string }) {
  const { token } = useUserStore((state) => ({
    token: state.userResponse.token,
  }));

  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      //no entiendo porque es put, supongo que borrado logico
      const response = await api.put(
        `/Users/Activate/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Usuario Eliminado Correctamente")
      queryClient.invalidateQueries({queryKey:["usersAll"]})
    },
    onError: (error) => {
      toast.error("Hubo un error al eliminar el usuario");
      console.log(error)
    }
  });

  const handleDeleteButtonClick = () => {
    deleteUserMutation.mutate(id)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Esta absolutamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta accion no puede deshacerse. Esto borrara al usuario de manera
            permanente del sistema
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
          onClick={handleDeleteButtonClick}
          >Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
