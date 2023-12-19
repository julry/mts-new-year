import styled from "styled-components";
import bg from "../../assets/images/bgSnow.png";
import logo from "../../assets/images/logo.svg";
import composition from "../../assets/images/composition.png";
import { ButtonCentered } from "../shared/button";
import { Title } from "../shared/common-text";
import { FlexWrapper } from "../shared/flex-wrapper";
import { SendModal } from "../shared/send-modal";

const Wrapper = styled(FlexWrapper)`
    width: 100%;
    height: 100%;
    padding: calc(var(--screen_padding) * 2.1) var(--screen_padding) calc(var(--screen_padding) * 2);
    background: url(${bg}) no-repeat 0 0 / cover;
    overflow: hidden;

    @media screen and (max-height: 700px) {
        padding-top: calc(var(--screen_padding) * 1.5); 
    }
`;

const Content = styled(FlexWrapper)`
    position: relative;
    z-index: 4;
    flex-shrink: 0;
    flex-grow: 1;
`;

const ButtonStyled = styled(ButtonCentered)`
    margin-top: auto;
`;

const LogoStyled = styled.div`
    position: relative;
    z-index: 2;
    width: min(46px, 12.4vw);
    height: min(46px, 12.4vw);
    background: url(${logo}) no-repeat 0 0 / cover;
    margin-bottom: calc(var(--screen_padding) * 1.8);
    flex-shrink: 0;

    @media screen and (max-height: 700px) {
        margin-bottom: calc(var(--screen_padding) * 1.1); 
    }

    @media screen and (max-height: 450px) {
        display: none;
    }
`;

const Composition = styled.img`
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    width: 100%;
`;

const Text = styled.p`
    font-size: 14px;
    line-height: 20px;

    @media screen and (max-height: 600px) {
        font-size: 13px;
        line-height: 19px;
    }

    @media screen and (max-width: 320px) {
        font-size: 13px;
        line-height: 19px;
    }
`;

const SendDataModal = styled(SendModal)`
    top: 50%;
    transform: translate(-50%, -50%);
    padding-top: calc(var(--screen_padding) * 5 / 6);
    @media screen and (max-height: 550px) {
        position: static;
        transform: none;
        margin: calc(var(--screen_padding) * 1.2) auto calc(var(--screen_padding) * 2 / 3);
    }
`;


export const Screen5 = () => {
    const handleClose = () => {
        window.open('','_self').close()
    };

    return (
        <Wrapper>
            <LogoStyled />
            <Content>
                <Title>
                    Всё в твоих руках
                </Title>
                <Text>
                    Верить в чудеса — прекрасно, но действовать — ещё лучше, ведь ты можешь исполнить все мечты самостоятельно.
                    <br/>
                    <br/>
                    Молодец, первый шаг уже сделан.
                </Text>
                <SendDataModal>Данные отправлены!</SendDataModal>
                {/* <ButtonStyled onClick={handleClose}>хо-хо-хо</ButtonStyled> */}
            </Content>
            <Composition src={composition} alt=''/>
        </Wrapper>
    );
}