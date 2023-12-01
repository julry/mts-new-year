import styled from "styled-components";
import { getArray } from "../../../utils/getArray";
import { Button } from "../../shared/button";
import { FlexWrapper } from "../../shared/flex-wrapper";
import { CELLS_AMOUNT, TRIES_AMOUNT } from "./constants";

const Content = styled(FlexWrapper)`
    width: 100%;
    height: 100%;
    ${({$isBlurred}) => $isBlurred ? 'filter: blur(3.5px)' : ''};
    --cellWidth: 50px;

    @media screen and (max-width: 340px) {
        --cellWidth: 40px;
    }

    @media screen and (max-width: 300px) {
        --cellWidth: 35px;
    }
`;

const Line = styled.div`
  display: flex;
  height: var(--cellWidth);
  margin: 0 auto;

  & + & {
    margin-top: 8px;
  }
`;

const Cell = styled.div`
  height: var(--cellWidth);
  width: var(--cellWidth);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({background}) => background ?? 'transparent'};
  transition: background-color 0.3s ease-in;
  ${({$isClicked}) => $isClicked ? 'cursor: pointer' : ''};
  border: 1px solid black;

  & + & {
    margin-left: 2px;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const ButtonsBlock = styled.div`
    display: flex;
    margin: auto 0 min-width(45px, 12vw);
    align-items: center;
`;

const DeleteBtn = styled.button`
    height: 40px;
    width: 60px;
`;

export const Game = ({isBlurred, onRulesClick, tries, onChooseNumber, onAcceptTry, onDelete, isDoneBtnActive}) => {
    const numbers = getArray(10, (a, i) => i);
    const maxLength = 2;

    let numbersLines = getArray(maxLength).map((_, i) => numbers.slice(i * CELLS_AMOUNT, (i + 1) * CELLS_AMOUNT));

    return (
        <Content $isBlurred={isBlurred}>
                <button onClick={onRulesClick}>Правила</button>
                {tries.map((tr, ind) => (
                    <Line key={'line_' + ind}>
                        {tr.map((cell, i) => (
                            <Cell key={'cell_' + i} background={cell?.bg}>
                                <p>{cell?.num}</p>
                            </Cell>
                        ))}
                    </Line>
                ))}
                <ButtonsWrapper>
                    {numbersLines.map((tr, ind) => (
                        <Line key={'lineN_' + ind}>
                            {tr.map((cell, i) => (
                                <Cell key={'cellN_' + i} $isClicked onClick={() => onChooseNumber(cell)}>
                                    <p>{cell}</p>
                                </Cell>
                            ))}
                        </Line>
                    ))}
                </ButtonsWrapper>
                <ButtonsBlock>
                    <Button onClick={onAcceptTry} disabled={!isDoneBtnActive}>Проверить</Button>
                    <DeleteBtn onClick={onDelete}>X</DeleteBtn>
                </ButtonsBlock>
            </Content>
    );
};
