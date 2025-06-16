import type { Metadata } from "next";
import "./globals.css";
import TopNav from "@/components/shared/TopNav";

export const metadata: Metadata = {
  title: "GG24 UI Sample",
  description: "Gitcoin Grants UI for GG24",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
