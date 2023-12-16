import { screens } from '../screens.config';
import { useState } from 'react';

const INITIAL_PROGRESS = {
    isWin: false,
    email: '',
    isExperienced: null,
    isEmailSend: false,
};

export function useProgressInit() {
    /////////////////// for development ////////////////////////////////////
    const urlParams = new URLSearchParams(window.location.search);
    const screenParam = urlParams.get('screen');
    ////////////////////////////////////////////////////////////////////////

    const [currentScreenIndex, setCurrentScreenIndex] = useState(+screenParam || 0);
    const [progress, setProgress] = useState(INITIAL_PROGRESS);
    const screen = screens[currentScreenIndex];

    const next = () => {
        const nextScreenIndex = currentScreenIndex + 1;
        if (nextScreenIndex > screens.length - 1) return;

        setCurrentScreenIndex(nextScreenIndex);
    };

    const updateProgress = (newProgress) => {
        setProgress(prevProgress => ({...prevProgress, ...newProgress}));
    };

    return {
        progress,
        screen,
        isExperienced: progress.isExperienced,
        next,
        updateProgress,
    };
}
