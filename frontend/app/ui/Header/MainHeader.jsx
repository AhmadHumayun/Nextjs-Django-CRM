'use client';
import cx from 'clsx';
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
  Input,
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
  IconSearch
} from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import { AdpediaLogo } from './AdpediaLogo';
import Link from 'next/link';
const user = {
  name: 'Jane Spoonfighter',
  email: 'janspoon@fighter.dev',
  image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};

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

export function MainHeader() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  return (
<div className="bg-white flex justify-between w-full p-4">
      <div className="bbb">
        <Link href="/">
          <div className=" cursor-pointer">
            <AdpediaLogo />
          </div>
        </Link>
      </div>
      <div className="">
        <Input placeholder="Type to search..." leftSection={<IconSearch size={18} />}
          type="search"
        />
      </div>
      <div className="flex">
        <button className="bg-blue-500 text-white px-1 py-0.5 rounded-2xl text-xs">Settiings</button>
        <button className="bg-green-500 text-white px-1 py-0.5 rounded-2xl text-xs">SignOut</button>
        {/* <button className="bg-red-500 text-white px-4 py-2 rounded-3xl text-xs">Button C</button> */}
      </div>
    </div>
  );
}