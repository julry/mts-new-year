import styled from "styled-components";

export const Input = styled.input`
  position: relative;
  touch-action: none;
  width: 100%;
  border: 1px solid ${({$isWrong}) => $isWrong ? 'var(--main_red)' : 'rgba(188, 195, 208, 0.50)'};
  border-radius: 16px;
  padding: 10px 12px;
  font-size: 17px;
  color: var(--secondColor);
  width: 100%;
  background: #F2F3F7;
  font-family: 'MTSCompact', 'MTSText', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #626C77;
  }
`;