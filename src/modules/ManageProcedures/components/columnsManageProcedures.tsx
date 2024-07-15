import { ColumnDef, SortDirection } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  ChevronDownIcon,
  ChevronUpIcon,
  Pencil,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Printer } from "lucide-react";
import { FolderUp } from "lucide-react";
import { IManageProcedure } from "../interface/manageprocedure";
import CreateFormCotizacion from "./createFormCotizacion";
import InvoiceDialog from "./InvoiceDialog";
import { useState } from "react";

const SortedIcon = ({ isSorted }: { isSorted: false | SortDirection }) => {
  if (isSorted === "asc") {
    return <ChevronUpIcon className="h-4 w-4" />;
  }
  if (isSorted === "desc") {
    return <ChevronDownIcon className="h-4 w-4" />;
  }
  return null;
};

const ActionCell = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-2 justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>Cotizar</Button>
        </DialogTrigger>
        <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle className="text-center">Cotización</DialogTitle>
          </DialogHeader>
          <CreateFormCotizacion idcompany={id} />
        </DialogContent>
      </Dialog>
      <InvoiceDialog procedureId={id} />
    </div>
  );
};

export const columnsManageProcedure: ColumnDef<IManageProcedure>[] = [
  // {
  //   accessorKey:"id" ,
  //   header:"id" ,
  // },

  {
    accessorKey: "companyName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "initialDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de inicio
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "stepDetail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Paso Actual
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "customsClearance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Aduana
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.id;
      return <ActionCell id={id} />;
    },
  },
];
