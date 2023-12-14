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

export const Rules = ( { isFirstRules, onClose } ) => (
    <ModalWrapper>
        <ModalStyled>
            <ModalText>
                Введи 6 цифр предполагаемого индекса и нажми «Проверить».{'\n'}
                Если цифра верная и на своём месте, то ячейка станет красной.{'\n'}
                Если цифра верная, но стоит не там — голубой.{'\n'}{'\n'}
                У тебя 5 попыток — отгадай{'\n'}индекс целиком!
            </ModalText>
            <ExampleRow>
                <RulesCell>0</RulesCell>
                <RulesCell>1</RulesCell>
                <RulesCell background="var(--main_red)">2</RulesCell>
                <RulesCell>3</RulesCell>
                <RulesCell background="#45B6FC">4</RulesCell>
                <RulesCell>5</RulesCell>
            </ExampleRow>
            <ModalButton onClick={onClose}>{isFirstRules ? 'Начать' : 'Понятно'}</ModalButton>
        </ModalStyled>
    </ModalWrapper>
);
