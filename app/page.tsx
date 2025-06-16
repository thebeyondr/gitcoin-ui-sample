import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-7xl">GG24</h1>
        <p className="text-2xl">Gitcoin Grants UI is better than ever.</p>
        <Button>
          <Link href="/checkout" prefetch>
            View checkout sample
          </Link>
        </Button>
      </section>
    </main>
  );
}
