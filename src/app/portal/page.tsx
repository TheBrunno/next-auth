import UsersList from "@/modules/users/components/users-list";
import Link from "next/link";

export default function PortalPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Pagina do Portal</h1>

      <UsersList />

      <Link href="/api/logout" className="text-blue-500">Logout</Link>
    </main>
  );
}
