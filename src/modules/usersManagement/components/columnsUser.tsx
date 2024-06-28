import { ColumnDef } from "@tanstack/react-table"
import { IUser } from "../interface/users"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { Trash2 } from "lucide-react"
import { FolderUp  } from "lucide-react"

export const columnsUser: ColumnDef<IUser>[] = [
    // {
    //   accessorKey:"id" ,
    //   header:"id" ,
    // },
    {
      accessorKey:"name" ,
      header:"Nombres" ,
    },
    {
      accessorKey:"fatherLastName" ,
      header:"Apellido Paterno" ,
    },
    {
      accessorKey:"motherLastName" ,
      header:"Apellido materno" ,
    },
    // {
    //   accessorKey:"username" ,
    //   header:"username" ,
    // },
    {
      accessorKey:"email" ,
      header:"Correo" ,
    },
    {
      accessorKey:"status" ,
      header:"Estado" ,
    },
    // {
    //   accessorKey:"ci" ,
    //   header:"ci" ,
    // },
    // {
    //   accessorKey:"nit" ,
    //   header:"nit" ,
    // },
    // {
    //   accessorKey:"accountNumber" ,
    //   header:"accountNumber" ,
    // },
    // {
    //   accessorKey:"dateOfBirth" ,
    //   header:"dateOfBirth" ,
    // },
    // {
    //   accessorKey:"lastActive" ,
    //   header:"lastActive" ,
    // },
    // {
    //   accessorKey:"cellphoneNumber" ,
    //   header:"cellphoneNumber" ,
    // },
    { 
      accessorKey:"actions" ,
      header:"Acciones" ,
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
  
        return (
          <div className="flex gap-2 justify-center">
          <Button variant="outline" size="icon">
      <Pencil className="h-4 w-4" />
    </Button>
          <Button variant="outline" size="icon">
      <Trash2 className="h-4 w-4" />
    </Button>
          <Button variant="outline" size="icon">
      <FolderUp  className="h-4 w-4" />
    </Button>
          
          </div>
        )
      },
    },
  ]
  

