import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { useProgress } from "../../../hooks/useProgress";
import { getAllIndexes, getAllObjectIndexes } from "../../../utils/getAllIndexes";
import { getArray } from "../../../utils/getArray";
import { FlexWrapper } from "../../shared/flex-wrapper";
import { Game, Rules, IncorrectModal, FinishModal } from "./parts";

import { ADDITIONAL_TRIES_AMOUNT, ANSWER, CELLS_AMOUNT, MESSAGES, TRIES_AMOUNT } from "./constants";

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
            setCurrentNumId(0);
        }, 500);

        if (currentTry + 1 === tries[triesName].length) {
            if (isAdditional){
                handleCloseIncorrect();
                setIsAllIncorrect(true);
                return;
            }

            setTimeout(() => {
                setIsAdditional(true);
                setCurrentTry(0);
            }, 500);
            
            return;
        }
        
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
            {isAllIncorrect && <FinishModal onRestart={handleRestart} />}
        </Wrapper>
    );
};
