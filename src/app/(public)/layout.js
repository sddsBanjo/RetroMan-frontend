import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { TopbarMenu } from "@/components/ui/topbar-menu"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"]
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RetroMan — Gerencie seu backlog de jogos",
  description: "Organize sua biblioteca de jogos, acompanhe seu progresso e descubra estatísticas da sua jornada gamer.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-br"
      className={cn("font-sans", inter.variable)}
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased w-260 m-auto`}>
        <TopbarMenu />
        {children}
      </body>
    </html>
  );
}
