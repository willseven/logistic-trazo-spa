import { Button } from "@/components/ui/button";
import ListMenus from "./ListMenus";
import Link from "next/link";

export default function MenuRegisterPage() {
  return (
    <main>
      <Button asChild>
        <Link href="/dashboard/MenuRegister/new">Crear Menu</Link>
      </Button>
      <ListMenus />
    </main>
  );
}
