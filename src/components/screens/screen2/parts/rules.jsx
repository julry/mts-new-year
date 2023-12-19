import { styled } from "styled-components";
import { Cell } from "../../../shared/cell";
import { Modal, ModalWrapper, ModalText, ModalButton } from "../../../shared/modal-parts";

const ModalStyled = styled(Modal)`
    top: 50%;
    transform: translate(-50%, -50%);
`;

const RulesCell = styled(Cell)`
    background: ${({background}) => background ?? '#F2F3F7'};
    & + & {
        margin-left: 5px;
    }
`;

const ExampleRow = styled.div`
    display: flex;
    margin: calc(var(--screen_padding) * 4 / 3) 0;
`;

const Highlighted = styled.span`
    color: ${({color}) => color};
`;

export const Rules = ( { isFirstRules, onClose } ) => (
    <ModalWrapper>
        <ModalStyled>
            <ModalText>
                Введи 6 цифр предполагаемого индекса и нажми «Проверить».{'\n'}{'\n'}
                Если цифра верная и находится на своём месте, то ячейка загорится <Highlighted color={'#45B6FC'}>голубым</Highlighted> цветом. Если цифра верная, 
                но стоит не там — <Highlighted color={'var(--main_red)'}>красным</Highlighted>.{'\n'}{'\n'}
                Подсказка — одна цифра здесь встречается 2 раза, если отгадаешь расположение, обе станут цветными.{'\n'}{'\n'}
                У тебя 5 попыток — отгадай индекс целиком!
            </ModalText>
            <ExampleRow>
                <RulesCell>0</RulesCell>
                <RulesCell>1</RulesCell>
                <RulesCell background="#45B6FC">2</RulesCell>
                <RulesCell>3</RulesCell>
                <RulesCell background="var(--main_red)">4</RulesCell>
                <RulesCell>5</RulesCell>
            </ExampleRow>
            <ModalButton onClick={onClose}>{isFirstRules ? 'Начать' : 'Понятно'}</ModalButton>
        </ModalStyled>
    </ModalWrapper>
);
