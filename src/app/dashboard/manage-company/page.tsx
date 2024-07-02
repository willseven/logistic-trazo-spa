import { Button } from "@/components/ui/button";
import ListCompanies from "./ListCompanies";
import Link from "next/link";

export default function ManageCompanyPage() {
  return (
    <main>
      <Button asChild><Link href="/dashboard/manage-company/new">Crear Compañia</Link></Button>
      <ListCompanies/>
    </main>
  )
}
