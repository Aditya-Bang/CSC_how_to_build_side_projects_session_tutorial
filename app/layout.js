import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CSC Tutorial Practice",
  description: "CSC Tutorial Practice",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-full flex bg-black`}>{children}</body>
    </html>
  );
}
