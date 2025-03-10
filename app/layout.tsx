import { Poppins } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { Metadata } from "next";
import { queryClient } from "@/components/queryClient";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "Search for the weather in your city",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
