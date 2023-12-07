import styled from "styled-components";
import bg from '../../../assets/images/bg.png';
import { getArray } from "../../../utils/getArray";
import { Button } from "../../shared/button";
import { FlexWrapper } from "../../shared/flex-wrapper";
import { Cell } from "../../shared/cell";

const Content = styled(FlexWrapper)`
    width: 100%;
    height: 100%;
    ${({$isBlurred}) => $isBlurred ? 'filter: blur(3.5px)' : ''};

    &::before {
        content: '';
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        background: url('https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg');
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: cover;
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

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonCell = styled(Cell)`
    background-color: rgba(255,255,255,0.9);

    & + & {
        margin-left: 5px;
    }
`;

const ButtonsBlock = styled.div`
    display: flex;
    margin: auto auto min(45px, 12vw);
    align-items: center;
    max-width: calc(100% - 2 *var(--screen_padding));
    min-width: min(315px, 85vw);
`;

const DeleteBtn = styled.button`
    height: 40px;
    width: 60px;
`;

const CellStyled = styled(Cell)`
    overflow: hidden;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        background-image: url('https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg');
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: cover;
        margin: -35px;
        filter: blur(2px);
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
    margin: calc(var(--screen_padding) * 33 / 12) auto calc(var(--screen_padding) * 11 / 12);
`;

export const Game = ({isBlurred, onRulesClick, tries, onChooseNumber, onAcceptTry, onDelete, isDoneBtnActive}) => {
    const numbers = getArray(10, (a, i) => i);
    const maxLength = 2;

    let numbersLines = getArray(maxLength).map((_, i) => numbers.slice(i * numbers.length / 2, (i + 1) * (numbers.length / 2)));

    return (
        <Content $isBlurred={isBlurred}>
                <RulesButton onClick={onRulesClick}>Правила</RulesButton>
                <GameLines>
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
                    <DeleteBtn onClick={onDelete}>X</DeleteBtn>
                </ButtonsBlock>
            </Content>
    );
};
