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