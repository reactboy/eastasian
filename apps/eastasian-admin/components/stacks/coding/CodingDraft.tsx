import { useEffect, FC } from 'react';
import styled from '@emotion/styled';
import { EditorThemeClasses } from 'lexical';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import { ToolbarPlugin } from './ToolbarPlugin';
import { TreeViewPlugin } from './TreeViewPlugin';
import { HtmlObserverPlugin } from './HtmlObserverPlugin';

const setThemePrefix = (className: string): string => `editor_${className}`;

const theme: EditorThemeClasses = {
  ltr: setThemePrefix('ltr'),
  rtl: setThemePrefix('rtl'),
};

const AutoFocusPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
};

type CodingDraftProps = {
  listener: (html: string) => void;
};

export const CodingDraft: FC<CodingDraftProps> = (props) => {
  const { listener } = props;

  const onError = (error) => {
    console.error(error);
  };

  const initialConfig = {
    namespace: 'CodingDraft',
    onError,
    theme,
  };

  return (
    <StyledEditor>
      <div className="editor">
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor__input" />}
            placeholder={
              <p className="editor__placeholder">
                start express your philosophy🧙‍♀️
              </p>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <div className="editor__toolbar">
            <ToolbarPlugin />
          </div>
          <HtmlObserverPlugin listener={listener} />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <TreeViewPlugin />
        </LexicalComposer>
      </div>
    </StyledEditor>
  );
};

const StyledEditor = styled('div')`
  .editor {
    position: relative;
    &__input {
      font-size: 24px;
      min-height: 150px;
      padding: 8px;
      outline: none;
      & > p {
        margin: 0;
      }
    }
    &__placeholder {
      font-size: 24px;
      position: absolute;
      color: #868e96;
      top: 8px;
      left: 8px;
      margin: 0;
      pointer-events: none;
    }
    &__toolbar {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(-150%, 25%);
    }
  }
`;
