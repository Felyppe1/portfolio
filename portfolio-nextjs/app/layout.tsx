import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, Space_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteProvider } from "@/context/SiteContext";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "./_components/Header";
import { MobileMenu } from "./_components/MobileMenu";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-bricolage",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Felyppe — Portfolio",
  description: "Luiz Felyppe — desenvolvedor full-stack.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${bricolage.variable} ${hanken.variable} ${spaceMono.variable} antialiased`}
    >
      <body className="relative min-h-screen overflow-x-hidden bg-[var(--bg)] font-sans text-[var(--text)]">
        <ThemeProvider attribute="data-theme" themes={["dark", "light"]} defaultTheme="dark" enableSystem={false}>
          <SiteProvider>
            <Header />
            <MobileMenu />
            {children}
          </SiteProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
