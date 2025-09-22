import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
 import { ToastContainer, toast } from 'react-toastify';


export const metadata: Metadata = {
  title: "Survey App",
  description: "Create & Manage your forms! Get real time updations",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased  bg-[#faf5ff]`}
      >
        <Providers>
        {children}
           <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          theme="colored"
        />
        </Providers>
      </body>
    </html>
  );
}
