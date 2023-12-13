import styled from "styled-components";
import bg from "../../assets/images/bgSnow.png";
import logo from "../../assets/images/logo.svg";
import composition from "../../assets/images/composition.png";
import { useProgress } from "../../hooks/useProgress";
import { ButtonCentered } from "../shared/button";
import { Title } from "../shared/common-text";
import { FlexWrapper } from "../shared/flex-wrapper";

const Wrapper = styled(FlexWrapper)`
    width: 100%;
    height: 100%;
    padding: calc(var(--screen_padding) * 2.1) var(--screen_padding) calc(var(--screen_padding) * 2);
    background: url(${bg}) no-repeat 0 0 / cover;
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
`;

const Composition = styled.div`
    position: absolute;
    z-index: 1;
    inset: 0;
    background: url(${composition}) no-repeat 0 100% / cover;

    @media screen and (max-height: 800px) {
        background-position: 0 80%;
    }

    @media screen and (max-height: 700px) {
        background-position: 0 45%;
    }

    @media screen and (max-height: 600px) {
        background-position: 0 18%;
    }
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

export const Screen1 = () => {
    const { next } = useProgress();

    return (
        <Wrapper>
            <LogoStyled />
            <Content>
                <Title>
                    А что, если Дед Мороз существует?
                </Title>
                <Text>
                    Тогда тебе точно нужно написать ему письмо, рассказать о своих мечтах и поверить в чудо. 
                    Письмо положить в конверт и отправить по почте. Да, не юзерфрендли, зато олдскульно!
                    <br/>
                    <br/>
                    Есть одно НО — индекса резиденции Деда Мороза у тебя нет. 
                    Попробуй разгадать его и получи подарки! Или ещё круче — возможность присоединиться к команде МТС.
                </Text>
                <ButtonStyled onClick={next}>играть</ButtonStyled>
            </Content>
            <Composition />
        </Wrapper>
    )
}