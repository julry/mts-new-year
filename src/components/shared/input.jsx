import styled from "styled-components";

export const Input = styled.input`
  border: 1px solid ${({$isWrong}) => $isWrong ? 'var(--main_red)' : 'rgba(188, 195, 208, 0.50)'};
`;