import { ColumnDef } from "@tanstack/react-table"
import { IUser } from "../interface/users"
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
  ]
  

