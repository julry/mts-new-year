import styled from "styled-components";
import { openCompanyLink } from "../../../../utils/openCompanyLink";
import { Modal, ModalWrapper, ModalText, ModalButton } from "./modal-parts";

const IncorrectBlock = styled.div`
    width: 100%;

    & + & {
        margin-top: calc(var(--screen_padding) * 4 / 3);
    }
`;

export const FinishModal = ({ onRestart }) => (
    <ModalWrapper>
        <Modal>
            <IncorrectBlock>
                <ModalText>
                    Ох-ох-ох…
                    <br/>
                    <br/>
                    Ты очень близко к разгадке! Мы хотим поддержать тебя 
                    в новой попытке, как наша hr-команда поддерживает и направляет всех новичков в МТС. Давай попробуешь ещё раз?
                </ModalText>
                <ModalButton type='secondary' onClick={onRestart}>Попробовать снова</ModalButton>
            </IncorrectBlock>
            <IncorrectBlock>
                <ModalText>
                    Не обязательно ждать волшебства от Деда Мороза, ведь ты можешь создать его самостоятельно — в МТС!
                    <br/>
                    <br/>
                    Делай первые шаги к своей мечте вместе с крутой командой уже сейчас, и тогда 
                    наступающий год точно принесёт тебе много приятных сюрпризов!
                </ModalText>
                <ModalButton onClick={openCompanyLink}>Хочу в мтс</ModalButton>
            </IncorrectBlock>
        </Modal>
    </ModalWrapper>
);
