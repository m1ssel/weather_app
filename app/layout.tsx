"use client";

import { Poppins } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Look for the weather in your city" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <body className={`${poppins.variable} font-poppins antialiased`}>
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
