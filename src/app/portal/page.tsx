import UsersList from "@/modules/users/components/users-list";

export default function PortalPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Pagina do Portal</h1>

      <UsersList />
    </main>
  );
}
