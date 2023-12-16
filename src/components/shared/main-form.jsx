import { useEffect, useState } from "react";
import styled from "styled-components";
import { useProgress } from "../../hooks/useProgress"
import blueBall from '../../assets/images/blueBall.png';
import redBall from '../../assets/images/redBall.png';
import stars from '../../assets/images/stars.png';
import composition from '../../assets/images/headerComposition.png';
import bg from '../../assets/images/formBg.png';
import { FlexWrapper } from "./flex-wrapper";
import { Input } from './input';
import { Select } from './select';
import { Modal, ModalButton, ModalText, ModalWrapper } from "./modal-parts";
import { Compact } from "./common-text";
import { DIRECTIONS_INTERN, DIRECTIONS_JOB, EMAIL_REG_EXP, GOOGLE_DATA, SKILLS_INTERN, SKILLS_JOB } from "../../constants";
import { ButtonCentered } from "./button";
import { useRef } from "react";
import { SendModal } from "./send-modal";
import { useMemo } from "react";

const Bg = styled.div`
    position: absolute;
    z-index: -1;
    inset: 0;
    background: url(${bg}) no-repeat 0 0 / cover;
`;

const Header = styled.div`
    position: absolute;
    display: flex;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 100%;
    justify-content: space-between;
`;

const Footer = styled(Header)`
    top: auto;
    bottom: min(11px, 2.9vw);
`;

const BlueBall = styled.img`
    --size: min(75px, 20vw);
    height: var(--size);
    width: var(--size);
    object-fit: contain;

    @media screen and (max-height: 700px) {
        max-height: 55px;
        max-width: 55px;
    }

    @media screen and (max-height: 600px) {
        max-height: 40px;
        max-width: 40px;
    }
`;

const Composition = styled.img`
    --size: min(104px, 27.7vw);
    height: var(--size);
    width: var(--size);
    object-fit: contain;
    margin-right: 9px;

    @media screen and (max-height: 700px) {
        max-height: 90px;
        max-width: 90px;
    }

    @media screen and (max-height: 600px) {
        max-height: 80px;
        max-width: 80px;
    }
`;

const Stars = styled.img`
    height: min(112px, 29.8vw);
    width: min(167px, 44.4vw);
    object-fit: contain;
    margin-left: min(14px, 3.7vw);
    margin-bottom: min(35px, 9.3vw);
`;

const RedBall = styled.img`
    height: min(152px, 40.5vw);
    width: min(128px, 34.1vw);
    object-fit: contain;
`;

const Wrapper = styled(FlexWrapper)`
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    padding: calc(${({$isExperienced}) => $isExperienced ? 3.1 : 4} * var(--screen_padding)) min(20px, 5.3vw) 0;
    ${({$isBlurred}) => $isBlurred ? 'filter: blur(3.5px)' : ''};
`;

const Note = styled(Compact)`
    margin-left: calc(0px - var(--screen_padding) * 5 / 24);
    color: #1D2023;
    font-size: 12px;
    
    @media screen and (max-height: 600px) {
        font-size: 10px;
    }
`;

const Label = styled(Compact)`
    color: #626C77;
    margin-top: calc(var(--screen_padding) / 2);
    margin-bottom: calc(var(--screen_padding) / 3);
    font-size: 14px;

    @media screen and (max-height: 700px) {
        font-size: 13px;
        margin-top: calc(var(--screen_padding) / 3);
        margin-bottom: calc(var(--screen_padding) / 5);
    }

    @media screen and (max-height: 600px) {
        font-size: 12px;
    }
`;

const TextArea = styled.textarea`
    overflow: auto;
    min-height: 94px;
    resize: none;

    @media screen and (max-height: 800px) {
        min-height: 84px;
    }

    @media screen and (max-height: 700px) {
        min-height: 64px;
    }
`;

const ButtonStyled = styled(ButtonCentered)`
    margin-top: calc(var(--screen_padding) * 2 / 3);
`;

const SendEmailModal = styled(SendModal)`
    top: auto;
    bottom: min(120px, 32.8vw);

    @media screen and (max-height: 700px){
        bottom: min(80px, 20vw);
    }
`;

const SendDataModal = styled(SendModal)`
    top: 50%;
    transform: translate(-50%, -50%);
`;


export const MainForm = () => {
    const { isExperienced, progress } = useProgress();

    const [isCorrectEmail, setIsCorrectEmail] = useState(true);
    const [isInfo, setIsInfo] = useState(true);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState(progress.email);
    const [direction, setDirection] = useState([]);
    const [skills, setSkills] = useState([]);
    const [exp, setExp] = useState('');
    const [isSend, setIsSend] = useState(false); 
    const [isSending, setIsSending] = useState(false); 
    const [isSendEmailModalShown, setIsSendEmailModalShown] = useState(progress.isEmailSend); 

    const $timeoutRef = useRef();

    const text = `Заполни короткую анкету, чтобы попасть ${isExperienced ? 'в команду ' : 'на стажировку в '}МТС. ` +
    'Помощники Деда Мороза по поиску талантов ознакомятся с ней. Если твои навыки подходят ' +
    'под открытую вакансию, они свяжутся с тобой. Только не расстраивайся, если не получишь ' +
    'ответ быстро. Ты всегда можешь найти работу твоей мечты на нашем сайте МТС Jobs и откликнуться на неё.';

    const directionOptions = isExperienced ? DIRECTIONS_JOB : DIRECTIONS_INTERN;
    const skillsOptions = isExperienced ? SKILLS_JOB : SKILLS_INTERN;

    useEffect(() => {
        if (progress.isEmailSend) {
            $timeoutRef.current = setTimeout(() => setIsSendEmailModalShown(false), 1500);
        }
        return () => {
            if ($timeoutRef.current) clearTimeout($timeoutRef.current);
        }
    }, [progress.isEmailSend]);

    const buttonDisabled = useMemo(() => (
        !name || !surname || !email || !direction.length || !skills.length || 
        (isExperienced && !exp) || isSending || !isCorrectEmail
    ), [name, surname, email, direction.length, skills.length, isExperienced, exp, isSending, isCorrectEmail]);

    const handleSendData = () => {
        if (isSending || isSend) return;

        const { 
            url, 
            name: entryName, 
            surname: entrySurname, 
            email: entryEmail, 
            direction: entryDirection, 
            skills: entrySkills, 
            exp: entryExp
        } = GOOGLE_DATA[isExperienced ? 'job' : 'int'];

        const formData = new FormData();

        formData.append(entryName, name);
        formData.append(entrySurname, surname);
        formData.append(entryEmail, email);
        formData.append(entryDirection, direction[0]);
        formData.append(entrySkills, skills.join(', '));
        formData.append(entryExp, exp);

        const myInit = {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        };

        setIsSending(true);
        const myRequest = new Request(url, myInit);

        fetch(myRequest).then(() => {
            setIsSend(true);
        }).finally(() => {
            setIsSending(false);
        });
    };

    const handleBlurEmail = () => {
        if (email.match(EMAIL_REG_EXP) || !email) {
            setIsCorrectEmail(true);
        } else {
            setIsCorrectEmail(false);
        }
    };

    const handleChangeEmail = (e) => {
        setIsCorrectEmail(true);
        setEmail(e.target.value);
    };


    return (
        <>
            <Wrapper $isExperienced={isExperienced} $isBlurred={isInfo}>
                <Bg>
                    <Header>
                        <BlueBall src={blueBall} alt="" />
                        <Composition src={composition} alt="" />
                    </Header>
                    {!isExperienced && (
                        <Footer>
                            <Stars src={stars} alt="" />
                            <RedBall src={redBall} alt="" />
                        </Footer>
                    )}
                </Bg>
                <Note>
                    Все поля формы обязательны для заполнения*
                </Note>
                <Label>Имя</Label>
                <Input
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Label>Фамилия</Label>
                <Input
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
                <Label>E-mail</Label>
                <Input
                    $isWrong={!isCorrectEmail}
                    type={'email'}
                    value={email}
                    onBlur={handleBlurEmail}
                    onChange={handleChangeEmail}
                />
                <Label>Выбери направление{!isExperienced ? ' стажировки' : ''}</Label>
                <Select
                    key={direction[0] ?? 'select_direction'}
                    label={`Выбери направление${!isExperienced ? ' стажировки' : ''}`}
                    values={direction}
                    onChange={(value) => setDirection(value)}
                    options={directionOptions}
                />
                <Label>Основные навыки</Label>
                <Select
                    key={skills.length > 0 ? skills.join(',') : 'select_skills'}
                    values={skills}
                    label='Основные навыки'
                    onChange={(value) => setSkills(value)}
                    isMulti
                    options={skillsOptions}
                />
                {isExperienced && (
                    <>
                        <Label>Опыт работы на каких позициях у тебя есть</Label>
                        <TextArea 
                            value={exp}
                            onChange={(e) => setExp(e.target.value)}
                        />
                    </>
                )}
                <ButtonStyled type="main" disabled={buttonDisabled} onClick={handleSendData}>Отправить</ButtonStyled>
            </Wrapper>
            {isInfo && (
                <ModalWrapper>
                    <Modal>
                        <ModalText>{text}</ModalText>
                        <ModalButton onClick={() => setIsInfo(false)}>заполнить</ModalButton>
                    </Modal>
                    {isSendEmailModalShown && <SendEmailModal>Почта отправлена!</SendEmailModal>}
                </ModalWrapper>
            )}
            {isSend && (
                <ModalWrapper>
                    <SendDataModal>Данные отправлены!</SendDataModal>
                </ModalWrapper>
            )}
        </>
    );
};
