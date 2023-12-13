import styled from "styled-components";
import bg from '../../../../assets/images/bgGame.png';
import { getArray } from "../../../../utils/getArray";
import { Button } from "../../../shared/button";
import { FlexWrapper } from "../../../shared/flex-wrapper";
import { Cell } from "../../../shared/cell";
import { CommonText } from "../../../shared/common-text";
import { TRIES_AMOUNT } from "../constants";
import { DeleteButton } from "./delete-button";

const background = `
    content: '';
    position: absolute;
    z-index: -1;
    inset: 0;
    background-image: url(${bg});
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center 0;
    background-size: cover;

    @media screen and (min-width: 400px) {
        background-size: 400px 850px;
    }
`;

const blurredBg = `
    ${background};
    margin: -2px;
    filter: blur(1px);
`;

const Content = styled(FlexWrapper)`
    width: 100%;
    height: 100%;
    --lineGap: 8px;
    
    ${({$isBlurred}) => $isBlurred ? 'filter: blur(3.5px)' : ''};

    &::before {
       ${background};
    }
`;

const Line = styled.div`
  display: flex;
  height: var(--cellWidth);
  margin: 0 auto;

  & + & {
    margin-top: var(--lineGap);
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonCell = styled(Cell)`
    background-color: rgba(255,255,255,0.9);

    p {
        touch-action: none;
        pointer-events: none;
        user-select: none;
    }
    
    & + & {
        margin-left: 5px;
    }
`;

const ButtonsBlock = styled.div`
    display: flex;
    margin: auto auto min(45px, 12vw);
    align-items: center;
    max-width: calc(100% - 2 * var(--screen_padding));
    min-width: min(315px, 85vw);

    & button{
        position: relative;

        &::before {
            ${blurredBg};
        }

        @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
            backdrop-filter: blur(2.5px);
            &::before {
                background: none;
                filter: none;
            }
        }
    }
`;

const CellStyled = styled(Cell)`
    overflow: hidden;
    position: relative;
    box-shadow: 0px 0px 2px rgba(111, 137, 222, 0.23);

    &::before {
        ${blurredBg};
    }

    @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
        backdrop-filter: blur(2.5px);
        &::before {
            background: none;
            filter: none;
        }
    }
`;

const RulesButton = styled.button`
    background: rgba(255, 255, 255, 0.7);
    color: black;
    outline: none;
    border: none;
    border-radius: 10px;
    max-width: 102px;
    margin: calc(var(--screen_padding) * 3 / 2) calc(var(--screen_padding) * 2 / 3) 0 auto;
    font-family: 'MTSText', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    padding: min(10px, 2.6vw) min(20px, 5.2vw);
    font-size: 15px;
    font-weight: 400;
`;

const GameLines = styled.div`
    min-height: calc(var(--cellWidth) * ${TRIES_AMOUNT} + var(--lineGap) * ${TRIES_AMOUNT - 1});
    margin: calc(var(--screen_padding) * 33 / 12) auto calc(var(--screen_padding) * 11 / 12);
`;

const AdditionalText = styled(CommonText)`
    text-align: center;
    color: #1D2023;
    margin-bottom: calc(var(--screen_padding) * 4 / 3);
`;

export const Game = ({
    isBlurred, onRulesClick, tries, 
    onChooseNumber, onAcceptTry, onDelete, 
    isDoneBtnActive, isAdditional,
}) => {
    const numbers = getArray(10, (a, i) => i);
    const maxLength = 2;

    let numbersLines = getArray(maxLength).map((_, i) => numbers.slice(i * numbers.length / 2, (i + 1) * (numbers.length / 2)));

    return (
        <Content $isBlurred={isBlurred}>
                <RulesButton onClick={onRulesClick}>Правила</RulesButton>
                <GameLines>
                    {isAdditional && (
                        <AdditionalText>
                            Ошибаться — это нормально.{'\n'}Держи ещё 2 попытки, мы в тебя верим!
                        </AdditionalText>
                    )}
                    {tries.map((tr, ind) => (
                        <Line key={'line_' + ind}>
                            {tr.map((cell, i) => (
                                <CellStyled key={'cell_' + i} background={cell?.bg}>
                                    <p>{cell?.num}</p>
                                </CellStyled>
                            ))}
                        </Line>
                    ))}
                </GameLines>
                <ButtonsWrapper>
                    {numbersLines.map((tr, ind) => (
                        <Line key={'lineN_' + ind}>
                            {tr.map((cell, i) => (
                                <ButtonCell key={'cellN_' + i} $isClicked onClick={() => onChooseNumber(cell)}>
                                    <p>{cell}</p>
                                </ButtonCell>
                            ))}
                        </Line>
                    ))}
                </ButtonsWrapper>
                <ButtonsBlock>
                    <Button onClick={onAcceptTry} disabled={!isDoneBtnActive}>Проверить</Button>
                    <DeleteButton onClick={onDelete} />
                </ButtonsBlock>
            </Content>
    );
};
