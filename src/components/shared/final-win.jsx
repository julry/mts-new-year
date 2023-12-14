import { useRef, useState } from "react";
import styled from "styled-components";
import { useProgress } from "../../hooks/useProgress"
import { ButtonCentered } from "./button";
import { CommonText, Title } from "./common-text";
import { ExperienceRadio } from "./experience-radio";
import { FlexWrapper } from "./flex-wrapper";
import { Input } from "./input";

const Wrapper = styled(FlexWrapper)`
    width: 100%;
    height: 100%;
    padding-top: calc(3.8 * var(--screen_padding));
`;

const ContentWrapper = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: min(93.333vw, 350px);

    @media screen and (max-width: 370px) {
        padding: 0 4vw;
    }
`;

const InputStyled = styled(Input)`
    margin-top: min(16px, 4.3vw);
    margin-bottom: min(16px, 4.3vw);
`;

const RadioIconStyled = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border: 1px solid var(--main_red);
  border-radius: 5px;
  margin-right: min(10px, 2.6vw);
  @media screen and (max-height: 700px) {
    width: 17px;
    height: 17px;
  }
`;

const InputRadioButton = styled.input`
  display: none;
`;

const RadioButtonLabel = styled.label`
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    font-size: 12px;
    font-weight: 300;
    width: 100%;
    text-align: left;
    border-radius: 5px;
    margin-top: min(16px, 4.3vw);
    margin-bottom: min(16px, 4.3vw);
  & a {
    color: inherit;
  }
  
  & ${InputRadioButton}:checked + ${RadioIconStyled}:after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: var(--main_red);
    display: inline-block;
    border-radius: 1px;
  };
 
  @media screen and (max-height: 600px) {
    font-size: 10px;
  }
  @media screen and (max-width: 310px) {
    font-size: 10px;
  }
`;

const FormWrapper = styled.div`
    margin-top: calc(var(--screen_padding) * 4 / 3);
    padding: calc(var(--screen_padding) * 7 / 6)  calc(var(--screen_padding) * 5 / 6);
    text-align: center;
    background: rgba(255, 255, 255, 0.6);
    border-radius: calc(var(--screen_padding) * 4 / 3);
`;

export const FinalWin = () => {
    const { next, isExperienced, updateProgress } = useProgress();
    const [email, setEmail] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [isCorrect, setIsCorrect] = useState(true);
    const [isAgreed, setIsAgreed] = useState(false);

    const $inputRef = useRef();

    const emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    const handleSendData = () => {
        if (isSending || isSend) return;

        updateProgress({email});
        // setIsSending(true);

        // const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSd-79EVSy5OaoO-HrB8NH01QWMFFVM3ohdkbXD8wfpfd7LhCg/formResponse';
        // const EMAIL_ID = 'entry.995014161';
        // const formData = new FormData();

        // formData.append(EMAIL_ID, email);

        // const myInit = {
        //     method: 'POST',
        //     mode: 'no-cors',
        //     body: formData
        // };

        // const myRequest = new Request(GOOGLE_FORM_ACTION_URL, myInit);

        // fetch(myRequest).then(() => {
        //     setIsSend(true);
        //   
        // }).finally(() => {
        //     setIsSending(false);
        //     if (typeof isExperienced === 'boolean') next();
        // });
    };

    const handleBlur = () => {
        if (email.match(emailRegExp) || !email) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    const handleChange = (e) => {
        setIsCorrect(true);
        setEmail(e.target.value);
    };

    const handleAgree = () => {
        if (isSending || isSend) return;
        setIsAgreed(prevAgreed => !prevAgreed);
    }

    return (
        <Wrapper>
            <ContentWrapper>
                <Title>
                    Стоп, это же индекс{'\n'}офиса МТС… 
                </Title>
                <CommonText>
                    Всё верно! Не обязательно ждать волшебства от Деда Мороза, 
                    ведь ты можешь создать его сам — в МТС! Делай первые шаги к своей мечте 
                    вместе с крутой командой уже сейчас, и тогда наступающий год точно принесёт 
                    тебе много приятных сюрпризов!
                </CommonText>
                <FormWrapper>
                <CommonText>
                    А подарки мы тебе и так подарим!{'\n'}
                    Оставляй контакты, чтобы участвовать в розыгрыше
                </CommonText>
                <InputStyled 
                    $isWrong={!isCorrect}
                    value={email} 
                    onBlur={handleBlur}
                    onChange={handleChange} 
                    placeholder="example@post.ru"
                />
                <ExperienceRadio />
                <RadioButtonLabel>
                    <InputRadioButton
                        type="checkbox"
                        value={isAgreed}
                        checked={isAgreed}
                        onChange={handleAgree}
                    />
                    <RadioIconStyled/>
                    <span>
                    Я согласен(а) на <a rel="noreferrer" href={'https://fut.ru/personal_data_policy/'} target="_blank">
                    обработку персональных данных</a> и получение информационных сообщений
                </span>
                </RadioButtonLabel>
                <ButtonCentered 
                    type="main" 
                    disabled={!email || !isAgreed || !isCorrect} 
                    onClick={handleSendData}
                >
                    отправить
                </ButtonCentered>
                </FormWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};
