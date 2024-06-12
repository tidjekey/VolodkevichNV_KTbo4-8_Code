import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { UserNav } from "./userNav";
import Heading from "@/components/ui/heading";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <main className="pb-[100rem]">
      <Heading>Личный кабинет</Heading>
      <div className="mt-[68rem]">
        <UserNav />

        {children}
      </div>
    </main>
  );
}
