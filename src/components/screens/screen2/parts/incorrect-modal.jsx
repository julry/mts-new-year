import { Modal, ModalWrapper, ModalText, ModalButton } from "../../../shared/modal-parts";

export const IncorrectModal = ({ onClose, text }) => (
    <ModalWrapper>
        <Modal>
            <ModalText>
                {text}
            </ModalText>
            <ModalButton onClick={onClose}>Продолжить</ModalButton>
        </Modal>
    </ModalWrapper>
);
