"use client";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

// export const metadata: Metadata = {
//   title: "Weather App",
//   description: "Look for the weather in your city",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={`${poppins.variable} font-poppins antialiased`}>
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
