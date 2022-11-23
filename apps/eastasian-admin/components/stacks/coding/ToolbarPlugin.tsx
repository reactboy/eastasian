import { useState } from 'react';
import { Box, ActionIcon, Menu } from '@mantine/core';
import {
  IconLink,
  IconPhoto,
  IconH1,
  IconH2,
  IconH3,
  IconAlignJustified,
} from '@tabler/icons';

type Text = 'h1' | 'h2' | 'h3' | 'p';
const textMeunIndex: Text[] = ['h1', 'h2', 'h3', 'p'];
const textMenu = {
  h1: <IconH1 />,
  h2: <IconH2 />,
  h3: <IconH3 />,
  p: <IconAlignJustified />,
};

const TextSelect = () => {
  const [text, setText] = useState<Text>('p');

  const onChangeText = (textValue: Text) => () => setText(textValue);

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="light" color="gray.6">
          {textMenu[text]}
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {textMeunIndex.map((key, i) => (
          <Menu.Item
            key={i}
            color={text === key ? 'gray.9' : 'gray.6'}
            onClick={onChangeText(key)}
          >
            {textMenu[key]}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export const ToolbarPlugin = () => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '8px',
        border: '1px solid #E9ECEF',
        padding: '4px',
        borderRadius: '12px',
      }}
    >
      <TextSelect />
      <ActionIcon variant="light" color="gray.6">
        <IconLink />
      </ActionIcon>
      <ActionIcon variant="light" color="gray.6">
        <IconPhoto />
      </ActionIcon>
    </Box>
  );
};
