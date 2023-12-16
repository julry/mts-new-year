import { useProgress } from "../../hooks/useProgress"
import { RadioButton } from "./radio-button";

export const ExperienceRadio = (props) => {
    const { isExperienced, updateProgress } = useProgress();
    const handleClick = () => {
        updateProgress({isExperienced: false});
    }

    return (
        <div {...props}>
            <RadioButton
                name='isExperienced'
                checked={isExperienced === false}
                onChange={handleClick}
            >
                Хочу в МТС, но у меня нет опыта
            </RadioButton>
            <RadioButton
                name='isExperienced'
                checked={isExperienced === true}
                onChange={() => updateProgress({isExperienced: true})}
            >
                Хочу в МТС, у меня уже есть опыт
            </RadioButton>
        </div>
    );
};
