import { useProgress } from "../../hooks/useProgress";
import { FinalWin } from "../shared/final-win";
import { MainForm } from "../shared/main-form";

export const Screen3 = () => {
    const { progress } = useProgress();

    // if (progress.isWin) 
    return <FinalWin />

    return <MainForm />
};
