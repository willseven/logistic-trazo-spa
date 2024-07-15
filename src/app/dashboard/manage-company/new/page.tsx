
import CreateNewCompanyForm from "./CreateNewCompanyForm";
import { Suspense } from "react";

export default function CreateNewCompanyPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <CreateNewCompanyForm />
      </Suspense>
    </main>
  );
}

