import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from 'next/headers'
import { NavBar } from "@/components/ui/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TodoApp",
  description: "Gerenciador de tarefas criado por Pedro Mello com Next.js e Nest.js",
};

export default async function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.has('access_token')

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased`}
    >
      <body className="min-h-screen bg-zinc-200 flex flex-col overflow-x-hidden overflow-y-hidden">
        <NavBar isLoggedIn={isLoggedIn}/>
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
