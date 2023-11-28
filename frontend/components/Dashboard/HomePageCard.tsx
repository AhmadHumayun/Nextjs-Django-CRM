"use client";
import React from "react";
import CardStats from "../CardStats";
import {Group} from '@mantine/core';

const Cards: React.FC = () => {
  return (
    <>
    <Group grow justify="space-between">
      <CardStats title="Test1" text="this is test 1" button_text="Button1"></CardStats>
      <CardStats title="Test1" text="this is test 1" button_text="Button1"></CardStats>
      <CardStats title="Test1" text="this is test 1" button_text="Button1"></CardStats>
    </Group>
    </>
  );
};

export default Cards;