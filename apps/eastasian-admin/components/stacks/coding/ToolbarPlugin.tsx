import { useState, FC, useEffect, useCallback, ReactNode } from 'react';
import { Box, ActionIcon, Menu } from '@mantine/core';
import {
  IconLink,
  IconPhoto,
  IconH1,
  IconH2,
  IconH3,
  IconAlignJustified,
} from '@tabler/icons';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createHeadingNode,
  $isHeadingNode,
  HeadingTagType,
} from '@lexical/rich-text';
import { $wrapNodes } from '@lexical/selection';
import { $findMatchingParent } from '@lexical/utils';
import {
  $isRangeSelection,
  $createParagraphNode,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  $getSelection,
  $isRootOrShadowRoot,
} from 'lexical';

type Heading = HeadingTagType;
type Paragraph = 'paragraph';
type TextFormat = Heading | Paragraph;
const textMeunIndex: TextFormat[] = ['h1', 'h2', 'h3', 'paragraph'];
const textMenu = {
  h1: <IconH1 />,
  h2: <IconH2 />,
  h3: <IconH3 />,
  paragraph: <IconAlignJustified />,
};
type TextFormatSelectProps = {
  editor: LexicalEditor;
  textFormat: TextFormat;
};

const TextFormatSelect: FC<TextFormatSelectProps> = (props) => {
  const { editor, textFormat } = props;

  const formatText = (textFormat: TextFormat) => () => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      textFormat === 'paragraph'
        ? $wrapNodes(selection, () => $createParagraphNode())
        : $wrapNodes(selection, () => $createHeadingNode(textFormat));
    });
  };

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="light" color="gray.6">
          {textMenu[textFormat]}
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {textMeunIndex.map((key, i) => (
          <Menu.Item
            key={i}
            color={textFormat === key ? 'gray.9' : 'gray.6'}
            onClick={formatText(key)}
          >
            {textMenu[key]}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState<LexicalEditor>(editor);
  const [textFromat, setTextFormat] = useState<TextFormat>('paragraph');

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return;
    const anchorNode = selection.anchor.getNode();

    let element =
      anchorNode.getKey() === 'root'
        ? anchorNode
        : $findMatchingParent(anchorNode, (e) => {
            const parent = e.getParent();
            return parent !== null && $isRootOrShadowRoot(parent);
          });

    if (element === null) element = anchorNode.getTopLevelElementOrThrow();

    //NOTE(eastasian) updating textFormat Menu by getting Tag info from element
    const type = $isHeadingNode(element) ? element.getTag() : element.getType();
    if (type in textMenu) setTextFormat(type as TextFormat);
  }, []);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, updateToolbar]);

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
      <TextFormatSelect editor={activeEditor} textFormat={textFromat} />
      <ActionIcon variant="light" color="gray.6">
        <IconLink />
      </ActionIcon>
      <ActionIcon variant="light" color="gray.6">
        <IconPhoto />
      </ActionIcon>
    </Box>
  );
};
