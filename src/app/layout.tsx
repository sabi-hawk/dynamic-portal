// import type { Metadata } from "next";
// import localFont from "next/font/local";
import Layout from "@/components/Layouts/index";
import "./globals.scss";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const role = "teacher";
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout role={role}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
