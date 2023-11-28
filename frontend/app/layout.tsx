// import '@mantine/dates/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import './index.css';
import '@mantine/core/styles.css';

import React from 'react';

import { theme } from '../theme';
// import MainHeader from './ui/Header/MainHeader';
import { MainHeader } from './ui/Header/MainHeader';
import { MainLayout } from '@/components/MainLayout';
import AppHeader from './ui/Header/AppHeader';
import "./globals.css";

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};
  function AppShellStyles() {
    return {
      body: {
        backgroundColor: "#78b0fd",
      },
      main: {
        whiteSpace: "pre",
        transition: "padding-left 600ms ease",
        margin: "0 0 0 35px",
        overflowX: "hidden",
        backgroundColor: "white",
      },
    };
  }

export default function RootLayout({ children }: { children: any }) {

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} >
          <MainLayout>
          {/* <MainHeader /> */}
          {/* <AppHeader /> */}
          
            {children}
          </MainLayout>
          </MantineProvider>
      </body>
    </html>
  );
}