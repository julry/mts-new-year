import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import bg from '../../assets/images/bgWin.png';
import { EMAIL_REG_EXP } from "../../constants";
import { useProgress } from "../../hooks/useProgress"
import { reachMetrikaGoal } from "../../utils/reachMetrikaGoal";
import { ButtonCentered } from "./button";
import { CommonText, Title } from "./common-text";
import { ExperienceRadio } from "./experience-radio";
import { FlexWrapper } from "./flex-wrapper";
import { Input } from "./input";

const background = `
    content: '';
    position: absolute;
    z-index: -1;
    inset: 0;
    background-image: url(${bg});
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center 100%;
    background-size: cover;

    @media screen and (min-width: 400px) {
        background-size: 400px 850px;
    }
`;

const blurredBg = `
    ${background};
    margin: -2px;
    filter: blur(3px);
`;

const Wrapper = styled(FlexWrapper)`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: calc(3.8 * var(--screen_padding));

    @media screen and (max-height: 750px) {
        padding-top: calc(2.5 * var(--screen_padding));
    }

    
    &::before {
        ${background};
    }
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

    ${({$isSend}) => $isSend ? '&::placeholder{text-align: center;}' : ''}
`;

const InputRadioButton = styled.input`
  display: none;
`;

const RadioIconStyled = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border: 1px solid var(--main_red);
  border-radius: 7px;
  margin-right: min(10px, 2.6vw);

  @media screen and (max-height: 700px) {
    width: 16px;
    height: 16px;
    border-radius: 6px;
  }

  @media screen and (max-height: 600px) {
    width: 14px;
    height: 14px;
    border-radius: 5px;
  }

    ${InputRadioButton}:checked + & {
        background-color: var(--main_red);
    }
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
  & a {
    color: inherit;
  }
  
  & ${InputRadioButton}:checked + ${RadioIconStyled}::before {
    content: '';
    position: absolute;
    top: 6.5px;
    left: 5px;
    height: 5px;
    width: 2px;
    transform: rotate(-45deg);
    background-color: #FFFFFF;
    display: inline-block;
    border-radius: 1px;
  };

  & ${InputRadioButton}:checked + ${RadioIconStyled}::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 8.5px;
    height: 8px;
    width: 2px;
    transform: rotate(45deg);
    background-color: #FFFFFF;
    display: inline-block;
    border-radius: 1px;
  };
 
  @media screen and (max-height: 700px) {
    font-size: 9px;

    & ${InputRadioButton}:checked + ${RadioIconStyled}::before {
        top: 5.5px;
        left: 4px;
    };

    & ${InputRadioButton}:checked + ${RadioIconStyled}::after {
        top: 3px;
        left: 7.5px;
    };
  }

  @media screen and (max-height: 600px) {
    font-size: 9px;

    & ${InputRadioButton}:checked + ${RadioIconStyled}::before {
        top: 4.5px;
        left: 3px;
    };

    & ${InputRadioButton}:checked + ${RadioIconStyled}::after {
        top: 2px;
        left: 6.5px;
    };
  }

  @media screen and (max-width: 310px) {
    font-size: 9px;

    & ${InputRadioButton}:checked + ${RadioIconStyled}::before {
        top: 4.5px;
        left: 3px;
    };

    & ${InputRadioButton}:checked + ${RadioIconStyled}::after {
        top: 2px;
        left: 6.5px;
    };
  }
`;

const FormWrapper = styled.div`
    margin-top: calc(var(--screen_padding) * 4 / 3);
    padding: calc(var(--screen_padding) * 7 / 6)  calc(var(--screen_padding) * 5 / 6);
    text-align: center;
    background: rgba(255, 255, 255, 0.6);
    border-radius: calc(var(--screen_padding) * 4 / 3);
    position: relative;
    overflow: hidden;

    &::before {
        ${blurredBg};
    }

    @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);

        &::before {
            filter: none;
            background: none;
        }
    }

    @media screen and (max-height: 700px) {
        margin-top: var(--screen_padding);
    }
`;

const ButtonStyled = styled(ButtonCentered)`
    margin-top: min(16px, 4.3vw);
`;

export const FinalWin = () => {
    const { next, isExperienced, updateProgress } = useProgress();
    const [email, setEmail] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [isCorrect, setIsCorrect] = useState(true);
    const [isAgreed, setIsAgreed] = useState(false);
    const $isMetrika = useRef(false);

    const handleSendData = () => {
        if (isSending || isSend) return;

        updateProgress({email});
        setIsSending(true);

        const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSf6JuOu-IZ8Ri_-xq21-_P6ALXAZ6q82cQjjyO-gyiIxerL5w/formResponse';
        const EMAIL_ID = 'entry.1143471537';
        const formData = new FormData();

        formData.append(EMAIL_ID, email);

        const myInit = {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        };

        const myRequest = new Request(GOOGLE_FORM_ACTION_URL, myInit);

        fetch(myRequest).then(() => {
            setIsSend(true);
            if (typeof isExperienced === 'boolean') updateProgress({isEmailSend: true});
        }).finally(() => {
            setIsSending(false);
            if (typeof isExperienced === 'boolean'){
                reachMetrikaGoal(`mail_${isExperienced ? 'exp' : 'noexp'}`);
                next();
            } else {
                reachMetrikaGoal('mail');
            }
        });
    };

    const handleBlur = () => {
        if (email.match(EMAIL_REG_EXP) || !email) {
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

    useEffect(() => {
        if (!$isMetrika.current) {
            reachMetrikaGoal('win');
            $isMetrika.current = true;
        };
    }, []);

    const handleNext = () => {
        if (typeof isExperienced === 'boolean'){
            reachMetrikaGoal(`win_${isExperienced ? 'exp' : 'noexp'}`);
            next();
        }
    };

    return (
        <Wrapper>
            <ContentWrapper>
                <Title>
                    Стоп, это же индекс{'\n'}офиса МТС… 
                </Title>
                <CommonText>
                    Всё верно! Не обязательно ждать волшебства
                    от Деда Мороза, создай его самостоятельно! Если кажется, что 
                    работа твоей мечты — в МТС, откликайся. Выбирай «Хочу в МТС…», 
                    и крутая карьера станет на шаг ближе!
                </CommonText>
                <FormWrapper>
                <CommonText>
                    А подарки мы тебе и так подарим!{'\n'}
                    Оставляй контакты, чтобы участвовать в розыгрыше. Результаты жди на почте в конце января.
                </CommonText>
                {isSend ? (
                    <InputStyled 
                        disabled
                        value=""
                        $isSend
                        placeholder="Почта отправлена!"
                    />
                ) : (
                    <InputStyled 
                        $isWrong={!isCorrect}
                        value={email} 
                        type="email"
                        onBlur={handleBlur}
                        onChange={handleChange} 
                        placeholder="example@post.ru"
                    />
                )}
                
                <ExperienceRadio />
                
                {isSend ? (
                    <ButtonStyled 
                        type="main" 
                        onClick={handleNext}
                        disabled={typeof isExperienced !== 'boolean'}
                    >
                        перейти
                    </ButtonStyled>
                ) : (
                    <>
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
                                обработку персональных данных</a> и получение информационных сообщений, а также с 
                                <a rel="noreferrer" href={'https://disk.yandex.ru/i/12q58zCgYou-Fg'} target="_blank">
                                правилами проведения акции</a>.
                            </span>
                        </RadioButtonLabel>
                        <ButtonStyled 
                            type="main" 
                            disabled={!email || !isAgreed || !isCorrect} 
                            onClick={handleSendData}
                        >
                            отправить
                        </ButtonStyled>
                    </>
                )}
                
                </FormWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};
