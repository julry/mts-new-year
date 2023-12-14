import styled from 'styled-components';
import { Button } from './button';
import { CommonText } from './common-text';
import { FlexWrapper } from './flex-wrapper';

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
    top: calc(4 * var(--screen_padding));
    left: 50%;
    width: calc(100% - var(--screen_padding) * 2 / 3);
    transform: translate(-50%, 0);
    text-align: center;
    border-radius: calc(var(--screen_padding) * 4 / 3);
    padding: calc(var(--screen_padding) * 4 / 3) calc(var(--screen_padding) * 5 / 6) calc(var(--screen_padding) * 5 / 6);
`;

export const ModalButton = styled(Button)`
    margin-top: calc(var(--screen_padding) * 2 / 3);
`;
