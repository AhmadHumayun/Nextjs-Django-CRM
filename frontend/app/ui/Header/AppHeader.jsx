"use client";

import React from "react";
import { useState } from 'react';
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from '@tabler/icons-react';


import { AdpediaLogo } from "./AdpediaLogo.jsx";
const tabs = [
  'Home',
  'Orders',
  'Education',
  'Community',
  'Forums',
  'Support',
  'Account',
  'Helpdesk',
];


export default function AppHeader() {
    const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));
 

  return (
    // <div className="flex justify-between w-full p-4">
      <Container fluid>
        <Tabs
          defaultValue="Home"
          variant="outline"
          visibleFrom="sm"

        >
          <Tabs.List justify="space-between">{items}</Tabs.List>
        </Tabs>
      </Container>
    // </div>
  );
}