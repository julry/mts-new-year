import styled from "styled-components";

export const CommonText = styled.p`
    font-size: 17px;
    line-height: 140%;

    @media screen and (max-height: 800px) {
        font-size: 15px;
    }

    @media screen and (max-height: 700px) {
        font-size: 14px;
    }

    @media screen and (max-height: 600px) {
        font-size: 13px;
    }

    @media screen and (max-width: 320px) {
        font-size: 13px;
    }
`;

export const Title = styled.h1`
    font-weight: 500;
    font-family: 'MTSWide', 'MTSText', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 20px;
    text-transform: uppercase;
    line-height: 24px;
    margin-bottom: var(--screen_padding);

    @media screen and (max-height: 700px) {
        font-size: 18px;
        line-height: 21px;
    }

    @media screen and (max-height: 600px) {
        font-size: 16px;
        line-height: 19px;
    }

    @media screen and (max-width: 320px) {
        font-size: 16px;
        line-height: 19px;
    }
`;