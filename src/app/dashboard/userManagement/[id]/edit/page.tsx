import EditUser from "./EditUser";

export default function EditUserPage({ params }: { params: { id: string } }) {
  const {id} = params;
  return (
    <main>
      <EditUser id={id}/>
    </main>
  );
}
