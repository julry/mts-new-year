import { useState } from "react";
import styled from "styled-components";
import { useProgress } from "../../hooks/useProgress"
import { FlexWrapper } from "./flex-wrapper";
import { Input } from './input';
import { Select } from './select';
import { Modal, ModalButton, ModalText, ModalWrapper } from "./modal-parts";
import { Compact } from "./common-text";
import { DIRECTIONS_INTERN, DIRECTIONS_JOB, SKILLS_INTERN, SKILLS_JOB } from "../../constants";

const Wrapper = styled(FlexWrapper)`
    width: 100%;
    height: 100%;
    padding: calc(${({$isExperienced}) => $isExperienced ? 3.1 : 4} * var(--screen_padding)) min(20px, 5.3vw) var(--screen_padding);
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

    @media screen and (max-height: 600px) {
        font-size: 12px;
    }
`;

const TextArea = styled(Input)`
    overflow: auto;
    min-height: 94px;
`;

export const MainForm = () => {
    const { isExperienced, progress } = useProgress();

    const [isInfo, setIsInfo] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState(progress.email);
    const [direction, setDirection] = useState([]);
    const [skills, setSkills] = useState([]);
    const [exp, setExp] = useState('');
    
    const text = `Заполни короткую анкету, чтобы попасть ${isExperienced ? 'в команду ' : 'на стажировку в '}МТС. ` +
    'Помощники Деда Мороза по поиску талантов ознакомятся с ней. Если твои навыки подходят ' +
    'под открытую вакансию, они свяжутся с тобой. Только не расстраивайся, если не получишь ' +
    'ответ быстро. Ты всегда можешь найти работу твоей мечты на нашем сайте МТС Jobs и откликнуться на неё.';

    const directionOptions = isExperienced ? DIRECTIONS_JOB : DIRECTIONS_INTERN;
    const skillsOptions = isExperienced ? SKILLS_JOB : SKILLS_INTERN;

    return (
        <>
            <Wrapper $isExperienced={isExperienced} $isBlurred={isInfo}>
                <Note>
                    Все поля формы обязательны для заполнения*
                </Note>
                <Label>Имя</Label>
                <Input
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Label>Выбери направление{!isExperienced ? ' стажировки' : ''}</Label>
                <Select
                    label={`Выбери направление${!isExperienced ? ' стажировки' : ''}`}
                    values={direction}
                    onChange={(value) => setDirection(value)}
                    options={directionOptions}
                />
                <Label>Основные навыки</Label>
                <Select
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
                <ModalButton type="main">Отправить</ModalButton>
            </Wrapper>
            {isInfo && (
                <ModalWrapper>
                    <Modal>
                        <ModalText>{text}</ModalText>
                        <ModalButton onClick={() => setIsInfo(false)}>заполнить</ModalButton>
                    </Modal>
                </ModalWrapper>
            )}
        </>
    );
};
