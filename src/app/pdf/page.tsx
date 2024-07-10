"use client"
import dynamic from "next/dynamic";
import PdfDialog from "./PdfDialog";

const PdfLogaalcargo = dynamic(()=> import("@/app/pdf/PdfLogaalcargo").then((m)=>m.default),
{
  ssr: false
}
)

export default function PdfPage() {
  return (
    <main className="h-screen">
      {/* <PdfDialog/> */}
      <PdfLogaalcargo/>
    </main>
  )
}
