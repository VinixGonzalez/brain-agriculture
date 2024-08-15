import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>404</h2>
      <p>Esta rota não existe</p>
      <Link href="/dashboard">Voltar para Dashboard</Link>
    </div>
  );
}
