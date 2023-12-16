import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { ButtonCentered } from "./button";
import { Compact, CommonText } from "./common-text";
import { FlexWrapper } from "./flex-wrapper";
import { Input } from "./input";
import { ModalWrapper } from "./modal-parts";

const ANIMATION_DURATION = 300;

const Wrapper = styled.div`
    position: relative;
    cursor: pointer;

    & input {
        cursor: pointer;
    }
`;

const Icon = styled.div`
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    height: 32px;
    width: 32px;
`;

const appear = keyframes`
  0% {
    bottom: -100vh;
  }

  100% {
    bottom: 0;
  }
`;

const disappear = keyframes`
  0% {
    bottom: 0;
  }

  100% {
    bottom: -100vh;
  }
`;

const opacityAppear = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;
const opacityDisappear = keyframes`
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
`;

const DarkenBg = styled(ModalWrapper)`
    z-index: 9;
    animation: ${({$isClosing}) => $isClosing ? opacityDisappear : opacityAppear} ${ANIMATION_DURATION}ms ease-in-out both; 
`;

const Selection = styled.div`
    z-index: 10;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 86%;
    animation: ${({$isClosing}) => $isClosing ? disappear : appear} ${ANIMATION_DURATION}ms ease-in-out both; 
    border-radius: calc(var(--screen_padding) * 5 / 6) calc(var(--screen_padding) * 5 / 6) 0 0;
    background: white;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none; 

    &::-webkit-scrollbar {
        display: none;
    }
`;

const SelectionHeaderWrapper = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    background: white;
    padding: 0 calc(var(--screen_padding) * 2 / 3) 
    0 calc(var(--screen_padding) * 5 / 6);
`;

const PickedItems = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: calc(var(--screen_padding) * 2 / 3);
    overflow: auto;
    max-height: 86px;

    @media screen and (max-height: 700px) {
        max-height: 72px;
    }
    
    @media screen and (max-height: 600px) {
        max-height: 63px;
    }
`;

const SelectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: calc(var(--screen_padding) * 5 / 6) 0 calc(var(--screen_padding) * 2 / 3);
`;

const CloseSelectionBtn = styled.button`
    margin-left: calc(var(--screen_padding) / 2);
    background: #F2F3F7;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(var(--screen_padding) * 4 / 3);
    height: calc(var(--screen_padding) * 4 / 3);
    border-radius: calc(var(--screen_padding) / 4);
    min-width: 24px;
    min-height: 24px;

    & svg {
        width: 75%;
        height: 75%;
    }
`;

const SelectionTitle = styled(Compact)`
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;

    @media screen and (max-height: 700px) {
        font-size: 18px;
        line-height: 21px;
    }

    @media screen and (max-height: 600px) {
        font-size: 16px;
        line-height: 19px;
    }

    @media screen and (max-width: 320px) {
        font-size: 16px;
        line-height: 19px;
    }
`;

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: calc(var(--screen_padding) * 2 / 3) calc(var(--screen_padding) * 5 / 6);
`;

const PickedIcon = styled.div`
    width: calc(var(--screen_padding) * 3 / 4);
    height: calc(var(--screen_padding) * 3 / 4);
`;

const PickedItem = styled.div`
    display: flex;
    padding: 8px 4px 8px 6px;
    align-items: center;
    background: ${({$isOpen}) => $isOpen ? '#F2F3F7' : '#FFFFFF'};
    margin-right: calc(var(--screen_padding) / 3);
    margin-bottom: ${({$isOpen}) => $isOpen ? 'calc(var(--screen_padding) / 3)' : '0'};
    border-radius: 6px;
    font-size: 14px;
    max-width: ${({$isOpen}) => $isOpen ? 'calc(100% - 20px)' : 'calc((100% - 25px) / 3)'};

    @media screen and (max-height: 700px) {
        font-size: 12px;
        padding-top: 6px;
        padding-bottom: 6px;
    }
    
    @media screen and (max-height: 600px) {
        padding-top: 4px;
        padding-bottom: 4px;
    }

    & p {
        overflow: hidden;
        white-space: nowrap;
        cursor: default;
        width: 100%;
        text-overflow: ellipsis;
    }

    & svg {
        margin-left: 4px;
        cursor: pointer;
        flex-shrink: 0;
    }
`;


const ItemText = styled(CommonText)`
    font-family: 'MTSCompact', 'MTSText', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const ButtonWrapper = styled(FlexWrapper)`
    position: sticky;
    bottom: 0;
    left: 0;
    padding-bottom: calc(var(--screen_padding) * 7 / 6);
`;

const MultiValues = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    inset: 6px;
    width: 100%;
    font-size: 14px;
`;

export const Select = ({ values, isMulti, options, label, onChange }) => {
    const [isOpened, setIsOpened] = useState(false);
    const [picked, setPicked] = useState([...values]);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
      if (isClosing) return;
      setIsClosing(true);
      setTimeout(() => {
        setIsOpened(false);
        setIsClosing(false);
        setPicked([...values]);
      }, ANIMATION_DURATION);
    };

    const handleRemoveItem = (value) => setPicked(prev => prev.filter(item => item !== value));

    const handlePick = (value) => {
        if (isMulti) {
            if (picked.includes(value)) handleRemoveItem(value);
            else setPicked(prev => [...prev, value]);

            return;
        }

        setPicked([value]);
    };

    const handleChoose = () => {
        onChange(picked);
        handleClose();
    };

    const handleInputRemove = (e, value) => {
        e.stopPropagation();
        const curValues = values.filter(item => item !== value);
        onChange(curValues);
        setPicked(curValues);
    };

    return (
        <>
            <Wrapper onClick={() => setIsOpened(true)}>
                <Input readOnly value={isMulti ? '' : values[0]}/>
                <Icon>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_621_2663)">
                        <path d="M9.01246 13C8.11226 13 7.66144 14.0766 8.29798 14.7062C8.29797 14.7062 8.29798 14.7062 8.29798 14.7062L11.4273 17.8016C13.5829 19.9339 14.6607 21 16 21C17.3393 21 18.4171 19.9339 20.5727 17.8016L23.702 14.7062C24.3386 14.0766 23.8877 13 22.9875 13C22.7196 13 22.4625 13.1053 22.2731 13.2927L19.1437 16.3882C18.0255 17.4942 17.3276 18.1786 16.7544 18.6112C16.2371 19.0016 16.0565 19.0012 16.0028 19.001L16 19.001L15.9973 19.001C15.9435 19.0012 15.7629 19.0016 15.2456 18.6112C14.6724 18.1786 13.9745 17.4942 12.8563 16.3882L9.72695 13.2927C9.72695 13.2927 9.72695 13.2927 9.72695 13.2927C9.53745 13.1053 9.28044 13 9.01246 13Z" fill="#969FA8"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_621_2663">
                        <rect width="24" height="24" fill="white" transform="translate(4 4)"/>
                        </clipPath>
                        </defs>
                    </svg>
                </Icon>
                {isMulti && values.length > 0 && (
                    <MultiValues>
                        {values?.slice(0, 2)?.map((value) => (
                              <PickedItem key={value} >
                                <Compact>{value}</Compact>
                                    <svg 
                                        onClick={(e) => handleInputRemove(e, value)}
                                        width="16" 
                                        height="16" 
                                        viewBox="0 0 16 16" 
                                        fill="none" 
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10.7206 11.7801C11.0133 12.0728 11.4878 12.0728 11.7805 11.7801C12.0731 11.4875 12.0731 11.013 11.7805 10.7203L9.06002 8.00002L11.7805 5.27966C12.0732 4.987 12.0732 4.51252 11.7805 4.21987C11.4878 3.92721 11.0133 3.92721 10.7207 4.21987L8.00019 6.94023L5.27934 4.21949C4.98667 3.92684 4.51217 3.92684 4.2195 4.21949C3.92683 4.51214 3.92683 4.98663 4.2195 5.27928L6.94035 8.00002L4.21954 10.7207C3.92687 11.0134 3.92687 11.4879 4.21954 11.7805C4.5122 12.0732 4.98671 12.0732 5.27937 11.7805L8.00019 9.05981L10.7206 11.7801Z" fill="#969FA8"/>
                                    </svg>
                            </PickedItem>
                        ))}
                        {values?.length > 2 && (
                            <Compact>+{values?.length - 2}</Compact>
                        )}
                    </MultiValues>
                )}
            </Wrapper>
            {isOpened && (
                <>
                    <DarkenBg $isClosing={isClosing}/>
                    <Selection $isClosing={isClosing}>
                        <SelectionHeaderWrapper>
                            <SelectionHeader>
                                <SelectionTitle>{label}</SelectionTitle>
                                <CloseSelectionBtn onClick={handleClose}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L11.9999 13.4143L16.2929 17.7073C16.6834 18.0978 17.3166 18.0978 17.7071 17.7073C18.0976 17.3167 18.0976 16.6836 17.7071 16.293L13.4141 12.0001L17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L11.9999 10.5859L7.70711 6.29304C7.31658 5.90252 6.68342 5.90252 6.2929 6.29304C5.90237 6.68357 5.90237 7.31673 6.29289 7.70726L10.5857 12.0001L6.29289 16.2929Z" fill="black"/>
                                    </svg>
                                </CloseSelectionBtn>
                            </SelectionHeader>
                            <PickedItems>
                                {picked.length > 0 && isMulti && picked.map(text => (
                                    <PickedItem key={text} $isOpen>
                                        <Compact>{text}</Compact>
                                        <svg 
                                            onClick={() => handleRemoveItem(text)}
                                            width="16" 
                                            height="16" 
                                            viewBox="0 0 16 16" 
                                            fill="none" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M10.7206 11.7801C11.0133 12.0728 11.4878 12.0728 11.7805 11.7801C12.0731 11.4875 12.0731 11.013 11.7805 10.7203L9.06002 8.00002L11.7805 5.27966C12.0732 4.987 12.0732 4.51252 11.7805 4.21987C11.4878 3.92721 11.0133 3.92721 10.7207 4.21987L8.00019 6.94023L5.27934 4.21949C4.98667 3.92684 4.51217 3.92684 4.2195 4.21949C3.92683 4.51214 3.92683 4.98663 4.2195 5.27928L6.94035 8.00002L4.21954 10.7207C3.92687 11.0134 3.92687 11.4879 4.21954 11.7805C4.5122 12.0732 4.98671 12.0732 5.27937 11.7805L8.00019 9.05981L10.7206 11.7801Z" fill="#969FA8"/>
                                        </svg>
                                    </PickedItem>
                                ))}
                            </PickedItems>
                        </SelectionHeaderWrapper>
                        <div>
                            {options?.map(({text, id}) => (
                                <Item key={id} onClick={() => handlePick(text)}>
                                    <ItemText>{text}</ItemText> 
                                    {picked.includes(text) && (
                                        <PickedIcon>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_621_2713)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7071 6.29289C20.0976 6.68342 20.0976 7.31658 19.7071 7.70711L10.7071 16.7071C10.3166 17.0976 9.68342 17.0976 9.29289 16.7071L4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929C4.68342 9.90237 5.31658 9.90237 5.70711 10.2929L10 14.5858L18.2929 6.29289C18.6834 5.90237 19.3166 5.90237 19.7071 6.29289Z" fill="#FF0032"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_621_2713">
                                                <rect width="24" height="24" fill="white"/>
                                                </clipPath>
                                                </defs>
                                            </svg>
                                        </PickedIcon>
                                    )}
                                </Item>
                            ))}
                        </div>
                        <ButtonWrapper>
                            <ButtonCentered type="main" onClick={handleChoose}>Выбрать</ButtonCentered>
                        </ButtonWrapper>
                    </Selection>
                </>
            )}
        </>
    );
};
