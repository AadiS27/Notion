import type { Metadata } from "next";
import{Toaster} from 'sonner';
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClient } from "convex/browser";
import { ConvexClientProvider } from "@/components/providers/convec-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notion Clone",
  description: "A Notion clone built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <ConvexClientProvider>
        <EdgeStoreProvider>
        <ThemeProvider
        /* trunk-ignore(eslint) */
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="notion-theme">
          <Toaster position="bottom-center"/>
          <ModalProvider />
        {children}
        </ThemeProvider>
        </EdgeStoreProvider>
        </ConvexClientProvider>
        </body>
    </html>
  );
}
