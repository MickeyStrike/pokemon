import type { Metadata } from "next";
import "./globals.css";
import { poppins } from '@/config/font'
import { GlobalContextProvider } from "@/providers/stores";
import Headers from "@/components/headers";
import TranslationProvider from "@/providers/translationProvider";

export const metadata: Metadata = {
  title: "Pokemon",
  description: "Pokemon World",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <GlobalContextProvider>
          <TranslationProvider>
            <Headers />
            <div style={{ marginTop: 99.5 }}>
              {children}
            </div>
          </TranslationProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}

export default RootLayout
