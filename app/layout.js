import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Blood Bridge. Your Blood Donation Hub",
  description: "You can donate blood spread charity. || Blood Bridge || Your Blood Donation Hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased` }
      >
        <ThemeProvider
          attribute="class"
          disableTransitionOnChange
          value={{
            light: "light",
            dark: "dark",
          }}
        >
          
          {children}
        <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
