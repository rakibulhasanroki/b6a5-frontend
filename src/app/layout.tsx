import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Planora",
    template: "%s | Planora",
  },
  description: `Planora is a secure, JWT-protected (using Better Auth) backend platform where Admins and registered 
  Users can create, manage, and participate in events.
  Events can be **Public or Private** and may include **registration fees`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${space.variable}  h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col">
        {children}
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
