import { styled } from "styled-components";

export const Cell = styled.div`
  height: var(--cellWidth);
  width: var(--cellWidth);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({background}) => background ?? 'rgba(255, 255, 255, 0.6)'};
  transition: background-color 0.3s ease-in;
  ${({$isClicked}) => $isClicked ? 'cursor: pointer' : ''};
  font-weight: 500;
  color: ${({background}) => background ? 'white' : 'black'};
  border-radius: calc(var(--cellWidth) * 2 / 9);
  flex-shrink: 0;
  
  & + & {
    margin-left: 2px;
  }
`;