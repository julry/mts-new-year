import styled from "styled-components";
import { Modal, ModalText, ModalWrapper } from "../../../shared/modal-parts";

const Wrapper = styled(ModalWrapper)`
    display: none;

    @media screen and (orientation: landscape) and (max-height: 570px) {
        display: block;
    }
`;

const ModalStyled = styled(Modal)`
    top: 50%;
    transform: translate(-50%, -50%);
`;

export const LandscapeModal = () => (
    <Wrapper>
        <ModalStyled>
            <ModalText>
                Чтобы начать игру, переверни устройство
            </ModalText>
        </ModalStyled>
    </Wrapper>
);
