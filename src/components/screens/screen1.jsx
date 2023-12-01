import styled from "styled-components";
import { useProgress } from "../../hooks/useProgress";
import { ButtonCentered } from "../shared/button";
import { FlexWrapper } from "../shared/flex-wrapper";

const Wrapper = styled(FlexWrapper)`
    width: 100%;
    height: 100%;
    padding: var(--screen_padding);
`;

const ButtonStyled = styled(ButtonCentered)`
    margin-top: auto;
`;

export const Screen1 = () => {
    const { next } = useProgress();

    return (
        <Wrapper>
            <h1>
                А что, если Дед Мороз существует?
            </h1>
            <p>
                Тогда ему нужно обязательно написать письмо со своими мечтами и поверить в чудо. 
                Письмо нужно положить в конверт и отправить по почте. Да, не юзерфрендли, зато олдскульно! 
                <br/>
                Но вот нюанс — индекса резиденции Деда Мороза у тебя нет. Попробуй разгадать его и получи подарки! 💌
            </p>
            <ButtonStyled onClick={next}>играть</ButtonStyled>
        </Wrapper>
    )
}