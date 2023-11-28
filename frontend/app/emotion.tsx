'use client';

import { CacheProvider } from '@emotion/react';
import {  MantineProvider } from '@mantine/core';
import { useServerInsertedHTML } from 'next/navigation';
import { MainHeader } from './ui/Header/MainHeader';

export default function RootStyleRegistry({ children }: { children: React.ReactNode }) {
  return (
    // <CacheProvider value={cache}>
      <MantineProvider >
        <MainHeader/>
        {children}
      </MantineProvider>
    // </CacheProvider>
  );
}