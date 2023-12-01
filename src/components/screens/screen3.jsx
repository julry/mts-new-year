import { useRef, useState } from "react";
import styled from "styled-components";
import { ButtonCentered } from "../shared/button";
import { FlexWrapper } from "../shared/flex-wrapper";

const Wrapper = styled(FlexWrapper)`
    width: 100%;
    height: 100%;
`;

const ButtonStyled = styled(ButtonCentered)`
    margin-top: min(16px, 4.3vw);
    margin-bottom: min(16px, 4.3vw);
`;

const ContentWrapper = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: min(93.333vw, 350px);

    @media screen and (max-width: 370px) {
        padding: 0 4vw;
    }
`;

const Input = styled.input`
  position: relative;
  touch-action: none;
  width: 100%;
  border: 1px solid ${({$isCorrect}) => $isCorrect ? 'rgba(188, 195, 208, 0.50)' : 'var(--main_red)'};
  border-radius: 16px;
  padding: 10px 12px;
  font-size: 17px;
  color: var(--secondColor);
  width: 100%;
  font-family: 'MTSCompact', 'MTSText', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #626C77;
  }
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
  margin: 8px auto min(20px, 5.1vw);
  text-align: left;
  border-radius: 5px;
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

export const Screen3 = () => {
    const [email, setEmail] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [isCorrect, setIsCorrect] = useState(true);
    const [isAgreed, setIsAgreed] = useState(false);

    const $inputRef = useRef();

    const emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    const handleSendData = () => {
        if (isSending || isSend) return;

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
        // }).finally(() => {
        //     setIsSending(false);
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
                <p>
                    Стоп, это же индекс главного офиса МТС… 
                    <br/>
                    Все верно! Не обязательно ждать чуда от Деда Мороза, ведь ты можешь создать его самостоятельно — в МТС!
                    <br/>
                    Делай первые шаги к своей мечте вместе с крутой командой уже сейчас, и тогда наступающий год точно 
                    принесёт тебе много приятных сюрпризов!
                </p>
                <ButtonStyled>Хочу в мтс</ButtonStyled>
                <p>
                    А подарки мы тебе и так подарим! Оставляй контакты, чтобы участвовать в розыгрыше
                </p>
                <Input 
                    $isCorrect={isCorrect}
                    value={email} 
                    onBlur={handleBlur}
                    onChange={handleChange} 
                    placeholder="example@post.ru"
                />
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
                    обработку персональных данных</a> и получение информационных сообщений
                </span>
                </RadioButtonLabel>
                {isSend && <div>
                    {'Данные отправлены — в случае\nпобеды мы напишем тебе на почту!'}
                </div>}
                <ButtonStyled 
                    type="secondary" 
                    disabled={!email || !isAgreed || !isCorrect} 
                    onClick={handleSendData}
                >
                    отправить
                </ButtonStyled>
            </ContentWrapper>
            
        </Wrapper>
    )
}