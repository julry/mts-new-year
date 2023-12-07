import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { useProgress } from "../../../hooks/useProgress";
import { getArray } from "../../../utils/getArray";
import { openCompanyLink } from "../../../utils/openCompanyLink";
import { ButtonCentered } from "../../shared/button";
import { CommonText } from "../../shared/common-text";
import { FlexWrapper } from "../../shared/flex-wrapper";
import { Cell } from "../../shared/cell";
import { ADDITIONAL_TRIES_AMOUNT, ANSWER, CELLS_AMOUNT, MESSAGES, TRIES_AMOUNT } from "./constants";
import { Game } from "./game";
import { getAllIndexes, getAllObjectIndexes } from "../../../utils/getAllIndexes";


const Wrapper = styled(FlexWrapper)`
    width: 100%;
    height: 100%;
    --cellWidth: 45px;

    @media screen and (max-width: 340px) {
        --cellWidth: 40px;
    }

    @media screen and (max-width: 300px) {
        --cellWidth: 35px;
    }
`;

const ButtonStyled = styled(ButtonCentered)`
    margin-top: calc(var(--screen_padding) * 2 / 3);
`;


const RulesWrapper = styled.div`
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
`;

const RulesText = styled(CommonText)`
    padding: 0 calc(var(--screen_padding) * 2 / 3);
`;

const RulesCell = styled(Cell)`
    background: ${({background}) => background ?? '#F2F3F7'};
    & + & {
        margin-left: 5px;
    }
`;

const Rules = styled(FlexWrapper)`
    position: absolute;
    background: white;
    color: #626C77;
    align-items: center;
    top: 50%;
    left: 50%;
    width: calc(100% - var(--screen_padding) * 2 / 3);
    transform: translate(-50%, -50%);
    text-align: center;
    border-radius: calc(var(--screen_padding) * 4 / 3);
    padding: calc(var(--screen_padding) * 4 / 3) calc(var(--screen_padding) * 5 / 6) calc(var(--screen_padding) * 5 / 6);
`;

const ExampleRow = styled.div`
    display: flex;
    margin: calc(var(--screen_padding) * 4 / 3) 0;
`;

export const Screen2 = () => {
    const { next } = useProgress();

    const [isRules, setIsRules] = useState(false);
    const [isFirstRules, setIsFirstRules] = useState(true);
    const [incorrect, setIncorrect] = useState({shown: false});
    const [isAllIncorrect, setIsAllIncorrect] = useState(false);
    const [isAdditional, setIsAdditional] = useState(false);

    const isBlurred = useMemo(() => isRules || incorrect.shown || isAllIncorrect, [isRules, incorrect.shown, isAllIncorrect]);
    const initialTries = useMemo(() => [...getArray(TRIES_AMOUNT, getArray(CELLS_AMOUNT, ''))],[]);
    const initialAddTries = useMemo(() => [...getArray(ADDITIONAL_TRIES_AMOUNT, getArray(CELLS_AMOUNT, ''))],[]);
    
    const [tries, setTries] = useState({main: initialTries, additional: initialAddTries});
    const [currentTry, setCurrentTry] = useState(0);
    const [currentNumId, setCurrentNumId] = useState(0);
    const [availableMessages, setAvailableMessages] = useState(MESSAGES);

    const triesName = useMemo(() => isAdditional ? 'additional' : 'main', [isAdditional]);
    const isDoneBtnActive = useMemo(() => (
        tries[triesName][currentTry].filter(tr => typeof (tr.num) === 'number').length === tries[triesName][currentTry].length
    ), [tries, triesName, currentTry]);

    const handleCloseRules = () => {
        if (isFirstRules) setIsFirstRules(false);

        setIsRules(false);
    };

    const handleRestart = () => {
        setIsAdditional(false);
        setIncorrect({shown: false});
        setIsAllIncorrect(false);
        setAvailableMessages(MESSAGES);
        setTries({main: initialTries, additional: initialAddTries});
        setCurrentTry(0);
        setCurrentNumId(0);
    };

    const onChooseNumber = (num) => {
        let id = currentNumId;
        if (id + 1 > CELLS_AMOUNT) return;
        const newTries = [...tries[triesName]];
        const newLine = [...newTries[currentTry]];
        newLine[id] = {num};
        newTries[currentTry] = newLine;
        setTries(prev => ({...prev, [triesName]: [...newTries]}));
        setCurrentNumId(() => id + 1);
    };

    const handleOpenIncorrect = useCallback(() => {
        const index = Math.floor((availableMessages.length - 1) * Math.random());
        setIncorrect({shown: true, index})
    }, [availableMessages, setIncorrect]);

    const handleCloseIncorrect = useCallback(() => {
        setAvailableMessages(mes => 
            (mes.filter((_, i) => i !== incorrect.index).length > 0 ? mes.filter((_, i) => i !== incorrect.index) : MESSAGES)
        );
        setIncorrect({shown: false});
    }, [setAvailableMessages, incorrect, setIncorrect]);


    const onAcceptTry = useCallback(() => {
        if (!isDoneBtnActive) return;
        const newTries = [...tries[triesName]];
        const newLine = [...newTries[currentTry]];
        const correctNums = [];
        newTries[currentTry] = newLine.reduce((coloredArr, n, i) => {
            let bg;
            let correct = false;
            if (ANSWER.includes(n.num)) {
                if (getAllIndexes(ANSWER, n.num).includes(i)) {
                    bg = 'var(--main_red)';
                    correct = true;
                    correctNums.push(n.num);
                } else if (
                    getAllObjectIndexes(newLine, 'num', n.num).includes(i) 
                    && ANSWER.filter(number => number === n.num).length > coloredArr.filter(({ num }) => num === n.num).length
                ) {
                    bg = '#45B6FC';
                }
            }
            return [...coloredArr, ({...n, bg, correct})];
        }, []).map(n => 
            (correctNums.filter((num ) => num === n.num).length === ANSWER.filter(number => number === n.num).length 
                && !n.correct ? ({...n, bg: undefined}) : n)
        );

        setTries(prev => ({...prev, [triesName]: [...newTries]}));
        if (newTries[currentTry].filter(num => !!num.correct).length === newTries[currentTry].length) {
            next();

            return;
        }

        setTimeout(() => {
            handleOpenIncorrect();
        }, 500);

        if (currentTry + 1 === tries[triesName].length) {
            if (isAdditional){
                handleCloseIncorrect();
                setIsAllIncorrect(true);
                return;
            }

            setTimeout(() => {
                setIsAdditional(true);
                setCurrentNumId(0);
                setCurrentTry(0);
            }, 500);
            
            return;
        }
        setCurrentNumId(0);
        setCurrentTry(id => id + 1);
    }, [currentTry, isAdditional, isDoneBtnActive, next, tries, triesName, handleCloseIncorrect, handleOpenIncorrect]);

    const onDelete = useCallback(() => {
        if (currentNumId - 1 < 0) return;
        const newTries = [...tries[triesName]];
        const newLine = [...newTries[currentTry]];
        newLine[currentNumId - 1] = {num: ''};
        newTries[currentTry] = newLine;
        setTries(prev => ({...prev, [triesName]: [...newTries]}));
        setCurrentNumId(numId => --numId);
    }, [currentNumId, tries, currentTry, triesName]);

    return (
        <Wrapper>
            <Game
                onRulesClick={() => setIsRules(true)}
                isBlurred={isBlurred}
                onChooseNumber={onChooseNumber}
                onAcceptTry={onAcceptTry}
                onDelete={onDelete}
                tries={tries[triesName]}
                isDoneBtnActive={isDoneBtnActive}
            />
            {isRules && (
                <RulesWrapper>
                    <Rules>
                        <RulesText>
                            Введи 6 цифр предполагаемого индекса и нажми «Проверить».{'\n'}
                            Если цифра верная и на своём месте, то ячейка станет красной.{'\n'}
                            Если цифра верная, но стоит не там — голубой.{'\n'}{'\n'}
                            У тебя 5 попыток — отгадай{'\n'}индекс целиком!
                        </RulesText>
                        <ExampleRow>
                            <RulesCell>0</RulesCell>
                            <RulesCell>1</RulesCell>
                            <RulesCell background="var(--main_red)">2</RulesCell>
                            <RulesCell>3</RulesCell>
                            <RulesCell background="#45B6FC">4</RulesCell>
                            <RulesCell>5</RulesCell>
                        </ExampleRow>
                        <ButtonStyled onClick={handleCloseRules}>{isFirstRules ? 'Начать' : 'Понятно'}</ButtonStyled>
                    </Rules>
                </RulesWrapper>
            )}
            {incorrect.shown && (
                <Rules>
                    <CommonText>
                        {availableMessages[incorrect.index]}
                    </CommonText>
                    <ButtonStyled onClick={handleCloseIncorrect}>Продолжить</ButtonStyled>
                </Rules>
            )}
            {isAllIncorrect && (
                <Rules>
                    <CommonText>
                    Ох-ох-ох…{'\n'}Ты очень близко к разгадке!
                    </CommonText>
                    <ButtonStyled onClick={handleRestart}>Попробовать снова</ButtonStyled>
                    <CommonText>
                        Не обязательно ждать волшебства от Деда Мороза, ведь ты можешь создать его самостоятельно — в МТС!
                        <br/>
                        Делай первые шаги к своей мечте вместе с крутой командой уже сейчас, и тогда 
                        наступающий год точно принесёт тебе много приятных сюрпризов!
                    </CommonText>
                    <ButtonStyled onClick={openCompanyLink}>Хочу в мтс</ButtonStyled>
                </Rules>
            )}
        </Wrapper>
    );
};
