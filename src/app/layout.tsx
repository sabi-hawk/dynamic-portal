'use client';
// import type { Metadata } from "next";
// import localFont from "next/font/local";
import Layout from "components/Layouts/index";
import "./globals.scss";
import { MessageProvider } from "utils";
import StateProvider from "providers/StateProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persister } from "flux/store";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
      >
        <StateProvider>
          <PersistGate loading={<div>Loading...</div>} persistor={persister}>
            <MessageProvider>
              <Layout>{children}</Layout>
            </MessageProvider>
          </PersistGate>
        </StateProvider>
      </body>
    </html>
  );
}
