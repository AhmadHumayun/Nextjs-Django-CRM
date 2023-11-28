"use client";
import React, { ReactNode } from "react";
import { Card, Image, Text, Menu, Button, Group } from '@mantine/core';

interface CardDataStatsProps {
  title: string;
  text: string;
  button_text: string;
  // children: ReactNode;
}

const CardStats: React.FC<CardDataStatsProps> = ({
  title,
  text,
  button_text,
  // children,
}) => {
  return (
    <>
    <Menu shadow="md" width={200}>
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {/* <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          // alt="Norway"
        />
      </Card.Section> */}

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        {/* <Badge color="pink" variant="light">
          On Sale
        </Badge> */}
      </Group>

      <Text size="sm" c="dimmed">
        {text}
      </Text>
      <Menu.Divider />
      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        {button_text}
      </Button>
    </Card>
    </Menu>
    </>
  );
};

export default CardStats;

