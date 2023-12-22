import styled from "styled-components";
import { useProgress } from "../../../../hooks/useProgress";
import { reachMetrikaGoal } from "../../../../utils/reachMetrikaGoal";
import { ExperienceRadio } from "../../../shared/experience-radio";
import { Modal, ModalWrapper, ModalText, ModalButton } from "../../../shared/modal-parts";

const IncorrectBlock = styled.div`
    width: 100%;

    & + & {
        margin-top: calc(var(--screen_padding) * 2 / 3);
    }
`;

const RadioBlock = styled(ExperienceRadio)`
    margin-top: calc(var(--screen_padding) * 4 / 3);
    margin-left: calc(var(--screen_padding) * 2 / 3);
`;

export const FinishModal = () => {
    const {next, isExperienced} = useProgress();

    const handleNext = () => {
        reachMetrikaGoal(`lose_${isExperienced ? 'exp' : 'noexp'}`);
        next();
    };

    return (
        <ModalWrapper>
            <Modal>
                <IncorrectBlock>
                    <ModalText>
                        Ох-ох-ох… Ты очень близко к разгадке! 
                        Мы хотим поддержать тебя в новой попытке, как наша hr-команда поддерживает и направляет 
                        всех новичков в МТС. Обнови игру и попробуй снова!
                    </ModalText>
                </IncorrectBlock>
                <IncorrectBlock>
                    <ModalText>
                        Не обязательно ждать волшебства от Деда Мороза, ведь ты можешь создать его самостоятельно — в МТС!
                    </ModalText>
                    <RadioBlock />
                    <ModalButton disabled={typeof isExperienced !== "boolean"} onClick={handleNext}>Хочу в мтс</ModalButton>
                </IncorrectBlock>
            </Modal>
        </ModalWrapper>
    );
};
