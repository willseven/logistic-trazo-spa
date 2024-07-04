"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PdfDocument from "./PdfDocument";

export default function PdfDialog() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[500px]">
        <PdfDocument/>
      </DialogContent>
    </Dialog>
  );
}
