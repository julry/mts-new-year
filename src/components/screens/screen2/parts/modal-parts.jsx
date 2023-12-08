import styled from 'styled-components';
import { Button } from '../../../shared/button';
import { CommonText } from '../../../shared/common-text';
import { FlexWrapper } from '../../../shared/flex-wrapper';

export const ModalWrapper = styled.div`
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
`;

export const ModalText = styled(CommonText)`
    padding: 0 calc(var(--screen_padding) * 2 / 3);
`;

export const Modal = styled(FlexWrapper)`
    position: absolute;
    background: white;
    color: #626C77;
    align-items: center;
    top: 50%;
    left: 50%;
    width: calc(100% - var(--screen_padding) * 2 / 3);
    transform: translate(-50%, -50%);
    text-align: center;
    border-radius: calc(var(--screen_padding) * 4 / 3);
    padding: calc(var(--screen_padding) * 4 / 3) calc(var(--screen_padding) * 5 / 6) calc(var(--screen_padding) * 5 / 6);
`;

export const ModalButton = styled(Button)`
    margin-top: calc(var(--screen_padding) * 2 / 3);
`;
