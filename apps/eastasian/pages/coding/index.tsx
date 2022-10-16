import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface CodingProps {}

const StyledCoding = styled.div`
  color: pink;
`;

export function Coding(props: CodingProps) {
  return (
    <StyledCoding>
      <h1>Welcome to Coding!</h1>
    </StyledCoding>
  );
}

export default Coding;
