import { FC, useState, useEffect } from 'react';
import { Box, Avatar, Text } from '@mantine/core';
import { listStack } from '@admin/api';

type Stack = {
  id: string;
  displayName: string;
  stackImage: string;
};

export const useStackSelect = () => {
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [selectedStacks, setSelectedStacks] = useState<Stack['id'][]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await listStack();
        setStacks([...stacks, ...data.stacks]);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const onClickStack = (id: string) => () => {
    if (!selectedStacks.includes(id))
      return setSelectedStacks((prevSelectedStacks) => [
        ...prevSelectedStacks,
        id,
      ]);
    setSelectedStacks((prevSelectedStacks) =>
      prevSelectedStacks.filter((stackId) => stackId !== id)
    );
  };

  const initSelectedStack = (initialStacks: Stack['id'][] = []) => {
    setSelectedStacks(initialStacks);
  };

  return {
    stacks,
    selectedStacks,
    onClickStack,
    initSelectedStack,
  };
};

type StackSelectProps = {
  stacks: Stack[];
  selectedStacks: Stack['id'][];
  onClickStack: (id: Stack['id']) => () => void | Promise<void>;
};

export const StackSelect: FC<StackSelectProps> = (props) => {
  const { onClickStack, stacks, selectedStacks } = props;
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '10px',
        padding: '12px 8px',
      }}
    >
      {stacks.map((stack) => {
        return (
          <Box
            key={stack.id}
            onClick={onClickStack(stack.id)}
            component="button"
            type="button"
            sx={{
              cursor: 'pointer',
              display: 'flex',
              flex: '0',
              alignItems: 'center',
              justifyContent: 'space-around',
              border: '1px solid #eee',
              borderRadius: '20px',
              padding: '4px',
              backgroundColor: '#fff',
              ...(selectedStacks.includes(stack.id)
                ? { backgroundColor: '#eee' }
                : {}),
            }}
          >
            {stack.stackImage && (
              <Avatar
                sx={{
                  width: '20px',
                  height: '20px',
                  img: { objectFit: 'contain' },
                }}
                src={stack.stackImage}
              />
            )}

            <Text>{stack.displayName}</Text>
          </Box>
        );
      })}
    </Box>
  );
};
