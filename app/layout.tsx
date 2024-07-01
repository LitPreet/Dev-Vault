import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import '../styles/prism.css'
import { ThemeProviders } from "./providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk ",
});

export const metadata: Metadata = {
  title: "Dev Vault",
  description:
    "Dev Vault is a vibrant community where anyone can ask and answer questions related to programming. Whether you're a beginner or an expert, share your knowledge, solve problems, and learn together in a collaborative environment. Welcome to the ultimate destination for all things coding!",
  // icons: {
  //   icon: "assets/images/auth-dark.png",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "primary-gradient",
          footerActionLink: "primary-text-gradient hover:text-primary-500",
        },
      }}
    >
      <html lang="en">
        <head>
        <link rel="icon" href="/assets/images/site-logo.svg" />
        </head>
        <body
          className={`${inter.variable} ${spaceGrotesk.variable} custom-scrollbar`}
        >
          <ThemeProviders>{children}</ThemeProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
