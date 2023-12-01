import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { useProgress } from "../../../hooks/useProgress";
import { getArray } from "../../../utils/getArray";
import { openCompanyLink } from "../../../utils/openCompanyLink";
import { ButtonCentered } from "../../shared/button";
import { FlexWrapper } from "../../shared/flex-wrapper";
import { CELLS_AMOUNT, TOTAL_TRIES_AMOUNT, TRIES_AMOUNT } from "./constants";
import { Game } from "./game";


const Wrapper = styled(FlexWrapper)`
    width: 100%;
    height: 100%;
`;

const ButtonStyled = styled(ButtonCentered)`
    margin-top: auto;
`;

const Rules = styled.div`
    position: absolute;
    inset: 0;
`;

export const Screen2 = () => {
    const { next } = useProgress();

    const [isRules, setIsRules] = useState(true);
    const [isFirstRules, setIsFirstRules] = useState(true);
    const [isFirstTry, setIsFirstTry] = useState(true);
    const [isIncorrect, setIsIncorrect] = useState(false);
    const [isAllIncorrect, setIsAllIncorrect] = useState(false);

    const isBlurred = useMemo(() => isRules || isIncorrect || isAllIncorrect, [isRules, isIncorrect, isAllIncorrect]);
    const initialTries = useMemo(() => [...getArray(TRIES_AMOUNT, getArray(CELLS_AMOUNT, ''))],[]);
    
    const [tries, setTries] = useState(initialTries);
    const [totalTries, setTotalTries] = useState(TOTAL_TRIES_AMOUNT);
    const [currentTry, setCurrentTry] = useState(0);
    const [currentNumId, setCurrentNumId] = useState(0);

    const isDoneBtnActive = useMemo(() => (
        tries[currentTry].filter(tr => typeof (tr.num) === 'number').length === tries[currentTry].length
    ), [tries, currentTry]);


    const handleCloseRules = () => {
        if (isFirstRules) setIsFirstRules(false);

        setIsRules(false);
    };

    const handleRestart = () => {
        setIsAllIncorrect(false);
        setIsFirstTry(false);
    };

    const onChooseNumber = (num) => {
        let id = currentNumId;
        if (id + 1 > CELLS_AMOUNT) return;
        const newTries = [...tries];
        const newLine = [...newTries[currentTry]];
        newLine[id] = {num};
        newTries[currentTry] = newLine;
        setTries([...newTries]);
        setCurrentNumId(() => id + 1);
    };

    const onAcceptTry = useCallback(() => {
        if (!isDoneBtnActive) return;
        const newTries = [...tries];
        const newLine = [...tries[currentTry]];
				const correctNums = [];
				const colored = newLine.map((n, i) => {
            let bg;
            let correct = false;
            // if (ANSWER.includes(n.num)) {
            //     if (ANSWER.indexOf(n.num) === i) {
            //         bg = colors.purple;
            //         correct = true;
			// 							correctNums.push(n.num);
            //     } else if (newLine.findIndex(num => num.num === n.num) === i) bg = colors.yellow;
            // }
            return ({...n, bg, correct});
        });

        newTries[currentTry] = colored
            .map(n => (correctNums.includes(n.num) && !n.correct) ? ({...n, bg: null}) : n);

        setTries([...newTries]);
        if (newTries[currentTry].filter(num => !!num.correct).length === newTries[currentTry].length) {
            next();

            return;
        }
        if (currentTry + 1 === tries.length) {
            if (totalTries > 1) {
                setTimeout(() => {
                    if (isFirstTry) setIsIncorrect();
                }, 500);
            } else {
                setIsAllIncorrect(true);
            }
            return;
        }
        setCurrentNumId(0);
        setCurrentTry(id => id + 1);
    }, []);

    const onDelete = useCallback(() => {
        if (currentNumId - 1 < 0) return;
        const newTries = [...tries];
        const newLine = [...tries[currentTry]];
        newLine[currentNumId - 1] = {num: ''};
        newTries[currentTry] = newLine;
        setTries([...newTries]);
        setCurrentNumId(numId => --numId);
    }, [tries, currentTry, currentNumId]);

    return (
        <Wrapper>
            <Game
                onRulesClick={() => setIsRules(true)}
                isBlurred={isBlurred}
                onChooseNumber={onChooseNumber}
                onAcceptTry={onAcceptTry}
                onDelete={onDelete}
                tries={tries}
                isDoneBtnActive={isDoneBtnActive}
            />
            {isRules && (
                <Rules>
                    <p>
                    <b>Введи 6 цифр</b> предполагаемого индекса и нажми «Проверить».{' '}
                    Если цифра верная и на своём месте, то [на ячейке появится] <b>[горящая лампочка.]</b>{' '}
                    Если цифра верная, но стоит не там — [появится] <b>[потухшая лампочка.]</b>
                    <br/>
                    У тебя <b>5 попыток</b>— отгадай индекс целиком!
                    </p>
                    <ButtonCentered onClick={handleCloseRules}>{isFirstRules ? 'Начать' : 'Понятно'}</ButtonCentered>
                </Rules>
            )}
            {isIncorrect && (
                <Rules>
                    <p>
                        Мы видели, у тебя почти получилось! Цифр много, и очень сложно выбрать правильную.{' '}
                        Возможно стоит с кем‑нибудь посоветоваться? У нас в МТС тоже много профессий,{' '}
                        но сделать правильный выбор всегда поможет карьерный консультант.
                    </p>
                    <ButtonCentered onClick={() => setIsIncorrect(false)}>Продолжить</ButtonCentered>
                </Rules>
            )}
            {isAllIncorrect && (
                <Rules>
                    <p>
                    Ох-ох-ох…{'\n'}Ты очень близко к разгадке!
                    </p>
                    <ButtonCentered onClick={handleRestart}>Попробовать снова</ButtonCentered>
                    <p>
                        Не обязательно ждать волшебства от Деда Мороза, ведь ты можешь создать его самостоятельно — в МТС!
                        <br/>
                        Делай первые шаги к своей мечте вместе с крутой командой уже сейчас, и тогда 
                        наступающий год точно принесёт тебе много приятных сюрпризов!
                    </p>
                    <ButtonCentered onClick={openCompanyLink}>Хочу в мтс</ButtonCentered>
                </Rules>
            )}
        </Wrapper>
    );
};
