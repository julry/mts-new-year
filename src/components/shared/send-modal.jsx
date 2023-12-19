import styled from "styled-components";
import { CommonText } from "./common-text";
import { Modal } from "./modal-parts";

const Wrapper = styled(Modal)`
    max-width: 232px;
`;

const Icon = styled.div`
    width: min(48px, 12.8vw);
    height: min(48px, 12.8vw);
    min-width: 30px;
    min-height: 30px;
    margin-bottom: calc(var(--screen_padding) / 3);
`;

const TextStyled = styled(CommonText)`
    font-family: 'MTSCompact', 'MTSText', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-weight: 500;
`;

export const SendModal = ({ className, children }) => (
    <Wrapper className={className}>
        <Icon>
            <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.15" fillRule="evenodd" clipRule="evenodd" d="M0.212245 18.4636C0.731454 11.4873 0.991058 7.99919 4.4922 4.49805C7.99334 0.996911 11.4815 0.737308 18.4577 0.218102C20.2661 0.0835113 22.1316 0.00195312 23.9971 0.00195312C25.8625 0.00195312 27.728 0.0835128 29.5364 0.218105C36.5127 0.737313 40.0008 0.996918 43.502 4.49806C47.0031 7.99919 47.2627 11.4873 47.7819 18.4636C47.9165 20.272 47.998 22.1375 47.998 24.0029C47.998 25.8684 47.9165 27.7339 47.7819 29.5423C47.2627 36.5185 47.0031 40.0067 43.5019 43.5078C40.0008 47.0089 36.5127 47.2686 29.5364 47.7878C27.728 47.9223 25.8625 48.0039 23.9971 48.0039C22.1316 48.0039 20.2661 47.9223 18.4577 47.7878C11.4815 47.2685 7.99333 47.0089 4.49219 43.5078C0.991052 40.0067 0.731449 36.5185 0.212243 29.5423C0.0776519 27.7339 -0.00390625 25.8684 -0.00390625 24.0029C-0.00390625 22.1375 0.0776534 20.272 0.212245 18.4636Z" fill="#26CD58"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M35.2186 19.2188C36.26 18.1774 36.26 16.489 35.2186 15.4476C34.1772 14.4062 32.4888 14.4062 31.4474 15.4476L21.333 25.5619L17.8853 22.1142C16.8439 21.0728 15.1555 21.0728 14.1141 22.1142C13.0727 23.1556 13.0727 24.8441 14.1141 25.8855L19.4474 31.2188C20.4888 32.2602 22.1772 32.2602 23.2186 31.2188L35.2186 19.2188Z" fill="#26CD58"/>
            </svg>
        </Icon>
        <TextStyled>{children}</TextStyled>
    </Wrapper>
);
