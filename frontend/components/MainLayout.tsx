"use client";
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group,Menu,Center, Box,Container,Tabs,Input } from '@mantine/core';

import { AdpediaLogo } from '@/app/ui/Header/AdpediaLogo';
import { IconSearch } from '@tabler/icons-react';

import { IconChevronDown } from '@tabler/icons-react';




const links = [
  { link: '/', label: 'Home' },
  {
    link: '#1',
    label: 'Learn',
    links: [
      { link: '/docs', label: 'Documentation' },
      { link: '/resources', label: 'Resources' },
      { link: '/community', label: 'Community' },
      { link: '/blog', label: 'Blog' },
    ],
  },
  { link: '/customers', label: 'Customers' },
  { link: '/contacts', label: 'Contacts' },
  {
    link: '#2',
    label: 'Support',
    links: [
      { link: '/faq', label: 'FAQ' },
      { link: '/demo', label: 'Book a demo' },
      { link: '/forums', label: 'Forums' },
    ],
  },
];

export function MainLayout({ children }: { children: any }) {
  const [opened, { toggle }] = useDisclosure();
const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
            //   className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span >{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        // className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <AppShell
    //   header={{ height: 100 }}
    //   navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Box>
            <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group justify="space-between" style={{ flex: 1 }}>
                <AdpediaLogo />
                <Input size='xs' placeholder="Type to Search ...." leftSection={<IconSearch size={16} />} />
                <Group ml="xl" gap={1} visibleFrom="sm">
                {/* <button className='bg-blue-500 text-white px-4 py-2'>Home</button> */}
                <button className='bg-red-500 text-white px-4 py-2 rounded-full text-sm'>Settings</button>
                <button className='bg-red-500 text-white px-4 py-2 rounded-full text-sm'>SignOut</button>
                </Group>
            </Group>
            </Group>
            <Container size="md">
               <Group gap={5} visibleFrom="sm" justify='space-between'>
                    {items}
                </Group>
            </Container>
        </Box>
      </AppShell.Header>

      <AppShell.Main style={{'background':'#78b0fd'}}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}