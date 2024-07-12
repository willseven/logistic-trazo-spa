"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PDFViewer } from "@react-pdf/renderer";
import PdfDocument from "./PdfDocument";
import { useQuery } from "@tanstack/react-query";
import { fetchProcedurePriceDetails } from "@/lib/data";

export type ProcedurePrice = {
  nro: any;
  origenDestino: string;
  origenDestinoDetalles: string;
  descripcionServicio: ServiceDescription[];
  validezOferta: string;
  tipoServicio: string;
  linea: string;
  incoterm: string;
  telefono: string;
  tipoDeCarga: string;
  tTaprox: string;
  moneda: string;
  peso: string;
  volumen: string;
  cwTaxable: string;
};

export type ServiceDescription = {
  label: string;
  description: string;
  description2: string;
  observation: string;
  stringValue: any;
  numberValue: number;
};

export default function InvoiceDialog({
  procedureId,
}: {
  procedureId: number;
}) {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["procedure", procedureId],
    queryFn: () => fetchProcedurePriceDetails(procedureId),
  });

  if (isLoading || isPending) {
    return (
      <Button size="icon">
        <Printer className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="icon">
          <Printer className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[500px]">
        <PDFViewer className="w-full h-full">
          <PdfDocument procedure={data!}/>
        </PDFViewer>
      </DialogContent>
    </Dialog>
  );
}
