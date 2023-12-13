import styled from "styled-components"
import bg from "../../../../assets/images/delete.svg";

const Wrapper = styled.button`
    position: relative;
    height: 40px;
    width: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 8px;
    background: transparent;

    & svg {
        user-select: none;
        pointer-events: none;
        z-index: 2;
    }
`;

const Background = styled.div`
    position: absolute;
    inset: 0;
    background: url(${bg}) no-repeat 0 0 / cover;
    z-index: -1;
    user-select: none;
    pointer-events: none;
`;

export const DeleteButton = (props) => (
    <Wrapper {...props}>
        <Background />
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.9882 6.98795C7.44381 6.53234 8.1825 6.53234 8.63812 6.98795L14.0003 12.3502L19.3626 6.98795C19.8182 6.53234 20.5569 6.53234 21.0125 6.98795C21.4681 7.44356 21.4681 8.18226 21.0125 8.63787L15.6503 14.0001L21.0126 19.3624C21.4682 19.818 21.4682 20.5567 21.0126 21.0123C20.5569 21.4679 19.8182 21.4679 19.3626 21.0123L13.9995 15.6508L8.63811 21.0122C8.1825 21.4678 7.4438 21.4678 6.98819 21.0122C6.53258 20.5566 6.53258 19.8179 6.98819 19.3623L12.3496 14.0009L6.9882 8.63787C6.53258 8.18226 6.53258 7.44356 6.9882 6.98795Z" fill="black"/>
        </svg>
    </Wrapper>
);
