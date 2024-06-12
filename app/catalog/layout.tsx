import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Silk Eye - Каталог",
  description: "",
};

export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
