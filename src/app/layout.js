import "./globals.css";
import ScrollResetOnReload from "@/components/ScrollResetOnReload";
import Providers from "@/components/Providers";
import { ElectricPointer } from "@/components/ElectricPointer";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata = {
  title: "K-Hub | Deep-Tech Innovation",
  description:
    "K-Hub - Driving deep-tech innovation across drug discovery, cybersecurity, robotics, materials science, and more.",
  authors: [{ name: "K-Hub" }],
  icons: {
    icon: [
      { url: "/logo-khub.png" },
      { url: "/logo-khub.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/logo-khub.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="theme-1" className={`h-full antialiased smooth-scroll ${caveat.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-body tracking-tight">
        <ScrollResetOnReload />
        <Providers>
          <ElectricPointer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
