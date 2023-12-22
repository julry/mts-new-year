import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { isMobile } from 'react-device-detect'
import { useProgress } from "../../../hooks/useProgress";
import { getAllIndexes, getAllObjectIndexes } from "../../../utils/getAllIndexes";
import { getArray } from "../../../utils/getArray";
import { FlexWrapper } from "../../shared/flex-wrapper";
import { Game, Rules, IncorrectModal, FinishModal, LandscapeModal } from "./parts";

import { ADDITIONAL_TRIES_AMOUNT, ANSWER, CELLS_AMOUNT, MESSAGES, TRIES_AMOUNT } from "./constants";
import { reachMetrikaGoal } from "../../../utils/reachMetrikaGoal";

const Wrapper = styled(FlexWrapper)`
    width: 100%;
    height: 100%;
    overflow: hidden;
    --cellWidth: 45px;

    @media screen and (max-width: 340px) {
        --cellWidth: 40px;
    }

    @media screen and (max-width: 300px) {
        --cellWidth: 35px;
    }
`;

const AdditionalButtonsWrapper = styled.div`
    position: absolute;
    top: min(105px, 28vw);
    left: min(18px, 4.8vw);
    right: min(18px, 4.8vw);
    display: flex;
    justify-content: space-between;
`;

const ButtonStyled = styled.button`
    --size:  min(36px, 9.6vw);
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    width: var(--size);
    height: var(--size);
    background: var(--main_red);
    opacity: ${({$isShown}) => $isShown ? 1 : 0};
    border-radius: 50%;

    & svg {
        width: calc(var(--size) * 7 / 18);
        height: calc(var(--size) * 11 / 18);
    }
`;

const ButtonLeft = styled(ButtonStyled)`
    & svg {
        margin-left: calc(0px - var(--size) * 5 / 36);
    }
`;

const ButtonRight = styled(ButtonStyled)`
    & svg {
        margin-right: calc(0px - var(--size) * 5 / 36);
    }
`;

export const Screen2 = () => {
    const { next, updateProgress } = useProgress();

    const [isRules, setIsRules] = useState(true);
    const [isFirstRules, setIsFirstRules] = useState(true);
    const [incorrect, setIncorrect] = useState({shown: false});
    const [isAllIncorrect, setIsAllIncorrect] = useState(false);
    const [isAdditional, setIsAdditional] = useState(false);
    const [hasReachAdditional, setHasReachAdditional] = useState(false);

    const isBlurred = useMemo(() => isRules || incorrect.shown || isAllIncorrect, [isRules, incorrect.shown, isAllIncorrect]);
    const initialTries = useMemo(() => [...getArray(TRIES_AMOUNT, getArray(CELLS_AMOUNT, ''))],[]);
    const initialAddTries = useMemo(() => [...getArray(ADDITIONAL_TRIES_AMOUNT, getArray(CELLS_AMOUNT, ''))],[]);
    
    const [tries, setTries] = useState({main: initialTries, additional: initialAddTries});
    const [currentTry, setCurrentTry] = useState(0);
    const [currentNumId, setCurrentNumId] = useState(0);
    const [availableMessages, setAvailableMessages] = useState(MESSAGES);

    const triesName = useMemo(() => isAdditional ? 'additional' : 'main', [isAdditional]);
    const isDoneBtnActive = useMemo(() => (
        tries[triesName][currentTry].filter(tr => typeof (tr.num) === 'number').length === tries[triesName][currentTry].length &&
        (!hasReachAdditional || (hasReachAdditional && isAdditional))
    ), [tries, triesName, currentTry, hasReachAdditional, isAdditional]);

    const handleCloseRules = () => {
        if (isFirstRules) {
            reachMetrikaGoal('training');
            setIsFirstRules(false);
        }

        setIsRules(false);
    };

    const onChooseNumber = useCallback((num) => {
        if (hasReachAdditional && !isAdditional) return;
        let id = currentNumId;
        if (id + 1 > CELLS_AMOUNT) return;
        const newTries = [...tries[triesName]];
        const newLine = [...newTries[currentTry]];
        newLine[id] = {num};
        newTries[currentTry] = newLine;
        setTries(prev => ({...prev, [triesName]: [...newTries]}));
        setCurrentNumId(id + 1);
    }, [currentNumId, currentTry, hasReachAdditional, isAdditional, tries, triesName]);

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
        let isChangedColors = false;
        newTries[currentTry] = newLine.reduce((coloredArr, n, i) => {
            let bg;
            let correct = false;
            if (ANSWER.includes(n.num)) {
                if (getAllIndexes(ANSWER, n.num).includes(i)) {
                    bg = '#45B6FC';
                    correct = true;
                    correctNums.push(n.num);
                } else if (
                    getAllObjectIndexes(newLine, 'num', n.num).includes(i) 
                    && ANSWER.filter(number => number === n.num).length > coloredArr.filter(({ num }) => num === n.num).length
                ) {
                    bg = 'var(--main_red)';
                }
            }
            isChangedColors = !!bg;
            return [...coloredArr, ({...n, bg, correct})];
        }, []).map(n => 
            (correctNums.filter((num ) => num === n.num).length === ANSWER.filter(number => number === n.num).length 
                && !n.correct ? ({...n, bg: undefined}) : n)
        );

        setTries(prev => ({...prev, [triesName]: [...newTries]}));
        if (newTries[currentTry].filter(num => !!num.correct).length === newTries[currentTry].length) {
            updateProgress({isWin: true});
            next();

            return;
        }

        if (currentTry + 1 === tries[triesName].length) {
            setCurrentNumId(0);
            if (isAdditional){
                setIsAllIncorrect(true);
                reachMetrikaGoal('lose');
                return;
            }

            setTimeout(() => {
                handleOpenIncorrect();
                if (!hasReachAdditional) {
                    setHasReachAdditional(true);
                    reachMetrikaGoal('check');
                }
                setIsAdditional(true);
                setCurrentTry(0);
            }, 500);
            
            return;
        } 

        setTimeout(() => {
            handleOpenIncorrect();
            setCurrentNumId(0);
        }, isChangedColors ? 500 : 0);
        
        setCurrentTry(id => id + 1);
    }, [isDoneBtnActive, tries, triesName, currentTry, updateProgress, next, isAdditional, handleOpenIncorrect, hasReachAdditional]);

    const onDelete = useCallback(() => {
        if (currentNumId - 1 < 0 || (hasReachAdditional && !isAdditional)) return;
        const newTries = [...tries[triesName]];
        const newLine = [...newTries[currentTry]];
        newLine[currentNumId - 1] = {num: ''};
        newTries[currentTry] = newLine;
        setTries(prev => ({...prev, [triesName]: [...newTries]}));
        setCurrentNumId(numId => --numId);
    }, [currentNumId, hasReachAdditional, isAdditional, tries, triesName, currentTry]);

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.code.toLowerCase().includes('digit') && e.key !== undefined) {
                onChooseNumber(+e.key);
            }
            if (e.code === 'Backspace') {
                onDelete();
            }
            if (e.code === 'Enter') {
                if (incorrect.shown) handleCloseIncorrect() 
                else onAcceptTry();
            }
        };

        window.addEventListener('keydown', onKeyDown);
        
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        }
    }, [onChooseNumber, onDelete, onAcceptTry, handleCloseIncorrect, incorrect.shown]);
    
    return (
        <Wrapper>
            {hasReachAdditional && (
                <AdditionalButtonsWrapper>
                    <ButtonLeft $isShown={isAdditional} onClick={() => setIsAdditional(false)}>
                        <svg viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.43899 11L13.053 19.0397C13.7348 19.6761 13.6243 20.622 12.806 21.1523C11.9878 21.6826 10.7717 21.5967 10.0898 20.9602L0.447001 11.9603C-0.149 11.404 -0.149 10.596 0.447001 10.0397L10.0898 1.03976C10.7717 0.403345 11.9878 0.317362 12.806 0.847706C13.6243 1.37805 13.7348 2.32389 13.053 2.96031L4.43899 11Z" fill="white"/>
                        </svg>
                    </ButtonLeft>
                    <ButtonRight $isShown={!isAdditional} onClick={() => setIsAdditional(true)}>
                        <svg viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.06101 11L0.447049 2.96031C-0.234822 2.32389 -0.12427 1.37805 0.693976 0.847704C1.51222 0.31736 2.72831 0.403346 3.41018 1.03976L13.053 10.0397C13.649 10.596 13.649 11.404 13.053 11.9603L3.41018 20.9602C2.72831 21.5967 1.51222 21.6826 0.693976 21.1523C-0.12427 20.622 -0.234822 19.6761 0.447049 19.0397L9.06101 11Z" fill="white"/>
                        </svg>
                    </ButtonRight>
                </AdditionalButtonsWrapper>
            )}
            <Game
                key={`game_additional_${isAdditional}`}
                hasReachAdditional={hasReachAdditional}
                isAdditional={isAdditional}
                onRulesClick={() => setIsRules(true)}
                isBlurred={isBlurred}
                onChooseNumber={onChooseNumber}
                onAcceptTry={onAcceptTry}
                onDelete={onDelete}
                tries={tries[triesName]}
                isDoneBtnActive={isDoneBtnActive}
            />
            {isRules && <Rules onClose={handleCloseRules} isFirstRules={isFirstRules} />}
            {incorrect.shown && <IncorrectModal text={availableMessages[incorrect.index]} onClose={handleCloseIncorrect} />}
            {isAllIncorrect && <FinishModal />}
            {isMobile && <LandscapeModal />}
        </Wrapper>
    );
};
