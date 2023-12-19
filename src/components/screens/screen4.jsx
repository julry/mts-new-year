import { useProgress } from "../../hooks/useProgress";
import { MainForm } from "../shared/main-form";
import { Screen5 } from "./screen5";

export const Screen4 = () => {
    const { progress } = useProgress();

    if (progress.isWin) return <MainForm />

    return <Screen5 />
}
