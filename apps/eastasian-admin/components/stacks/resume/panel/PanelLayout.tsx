import { ReactNode, FC } from 'react';
import { Title, Box } from '@mantine/core';

export const PanelLayout: FC<{
  title: string;
  children: ReactNode;
  headerSide?: ReactNode;
}> = (props) => {
  const { children, title, headerSide } = props;
  return (
    <Box sx={{ padding: '8px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title size="h2">{title}</Title>
        {headerSide && headerSide}
      </Box>
      <Box sx={{ padding: '8px 0' }}>{children}</Box>
    </Box>
  );
};
