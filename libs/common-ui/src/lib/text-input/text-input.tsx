import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface TextInputProps {}

const StyledTextInput = styled.div`
  color: pink;
`;

export function TextInput(props: TextInputProps) {
  return (
    <StyledTextInput>
      <h1>Welcome to TextInput!</h1>
    </StyledTextInput>
  );
}

export default TextInput;
