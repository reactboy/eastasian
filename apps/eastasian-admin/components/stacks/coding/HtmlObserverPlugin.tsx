import { useLayoutEffect } from 'react';
import { $getRoot } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { useDebounce } from './useDebounce';

export const HtmlObserverPlugin = ({
  listener,
  interval = 250,
}: {
  listener: (html: string) => void;
  interval?: number;
}) => {
  const [editor] = useLexicalComposerContext();
  const debaunce = useDebounce(interval);

  useLayoutEffect(() => {
    if (listener) {
      return editor.registerUpdateListener(
        ({ editorState, dirtyElements, dirtyLeaves, prevEditorState }) => {
          if (dirtyElements.size === 0 && dirtyLeaves.size === 0) return;
          if (prevEditorState.isEmpty()) return;

          debaunce(() => {
            editorState.read(() => {
              const root = $getRoot();
              const isEmptyText = root.getTextContent() === '';
              const html = isEmptyText ? '' : $generateHtmlFromNodes(editor);
              listener(html);
            });
          });
        }
      );
    }
  }, [editor, listener, debaunce]);

  return null;
};
