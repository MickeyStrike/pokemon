import type { Metadata } from "next";
import "./globals.css";
import { poppins } from '@/config/font'
import { GlobalContextProvider } from "@/providers/stores";
import Headers from "@/components/headers";
import { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Pokemon",
  description: "Pokemon World",
};
interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout:FC<RootLayoutProps> = ({
  children,
}) => {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <GlobalContextProvider>
          <Headers />
          <div style={{ marginTop: 60 }}>
            {children}
          </div>
        </GlobalContextProvider>
      </body>
    </html>
  );
}

export default RootLayout
