import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl">Components</h1>
      <section className="flex flex-col gap-4 flex-1 p-5">
        <Link href="/checkout">
          <Button>Checkout page</Button>
        </Link>
      </section>
    </main>
  );
}
