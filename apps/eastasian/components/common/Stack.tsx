import { FC } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

import { Stack as StackType } from '@resume/types';

const StyledStack = styled.div`
  display: flex;
  align-items: center;
  .stack__name {
    margin-left: 2px;
  }
`;

type StackProps = Partial<StackType>;

export const Stack: FC<StackProps> = (props) => {
  const { name, displayName, stackImage } = props;
  return (
    <StyledStack>
      {!!stackImage && (
        <Image src={stackImage} width="16px" height="16px" alt={name} />
      )}
      <p className="stack__name">{displayName}</p>
    </StyledStack>
  );
};
