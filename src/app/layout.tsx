import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Header, Sidebar } from "@/components";
import "./globals.css";
import { Providers } from "./providers";

const inter = Lato({ subsets: ["latin"], weight: ["300", "400", "700"] });

export const metadata: Metadata = {
  title: "Brain Agriculture App - Vinicius Gonzalez",
  description: "Brain Agriculture App - Vinicius Gonzalez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen flex flex-col`}>
        <Providers>
          <Header />
          <div className="flex flex-1">
            <aside className="hidden sm:block ">
              <Sidebar />
            </aside>
            <main className="w-full p-2 bg-slate-50 z-0">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
