import { FormEvent, useMemo, forwardRef } from 'react';
import { Input, Box, ActionIcon } from '@mantine/core';
import { IconLink } from '@tabler/icons';

type LinkInputProps = {
  position: { x: number; y: number };
  onSubmitLink: (e: FormEvent) => void | Promise<void>;
  value: string;
};

//TODO(eastasian) extract to utils
const getValueWithSuffix = (value: string | number, suffix = ''): string =>
  value + suffix;

export const LinkInput = forwardRef<HTMLFormElement, LinkInputProps>(
  (props, ref) => {
    const { position, onSubmitLink, value } = props;

    const actualPosition = useMemo(
      () => ({
        x: getValueWithSuffix(position.x, 'px'),
        y: getValueWithSuffix(position.y, 'px'),
      }),
      [position]
    );

    return (
      <Box
        ref={ref}
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: actualPosition.y,
          left: actualPosition.x,
          padding: '8px',
          borderRadius: '6px',
        }}
        bg="gray.1"
        onSubmit={onSubmitLink}
      >
        <Box>
          <Input miw={320} placeholder="https://" defaultValue={value} />
        </Box>
        <Box>
          <ActionIcon type="submit">
            <IconLink />
          </ActionIcon>
        </Box>
      </Box>
    );
  }
);

LinkInput.displayName = 'LinkInput';
