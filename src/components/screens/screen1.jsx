import styled from "styled-components";
import bg from "../../assets/images/bgSnow.png";
import logo from "../../assets/images/logo.svg";
import { useProgress } from "../../hooks/useProgress";
import { ButtonCentered } from "../shared/button";
import { FlexWrapper } from "../shared/flex-wrapper";

const Wrapper = styled(FlexWrapper)`
    width: 100%;
    height: 100%;
    padding: calc(var(--screen_padding) * 2.1) var(--screen_padding) calc(var(--screen_padding) * 2);
    background: url(${bg}) no-repeat 0 0 / cover;
`;

const ButtonStyled = styled(ButtonCentered)`
    margin-top: auto;
`;

const LogoStyled = styled.div`
    width: min(46px, 12.4vw);
    height: min(46px, 12.4vw);
    background: url(${logo}) no-repeat 0 0 / cover;
    margin-bottom: calc(var(--screen_padding) * 1.8);
`;

const Title = styled.h1`
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
            <Title>
                А что, если Дед Мороз существует?
            </Title>
            <Text>
                Тогда ему нужно обязательно написать письмо со своими мечтами и поверить в чудо. 
                Письмо нужно положить в конверт и отправить по почте. Да, не юзерфрендли, зато олдскульно! 
                <br/>
                <br/>
                Но вот нюанс — индекса резиденции Деда Мороза у тебя нет. Попробуй разгадать его и получи подарки! 💌
            </Text>
            <ButtonStyled onClick={next}>играть</ButtonStyled>
        </Wrapper>
    )
}