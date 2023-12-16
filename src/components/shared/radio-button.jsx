import React from 'react';
import styled from 'styled-components';
import { CommonText } from './common-text'

const WrapperStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  --radio_size: min(18px, 4.8vw);
  & + & {
    margin-top: 10px;
  }
`;

const InputStyled = styled.input`
  display: none;
`;

const RadioIconStyled = styled.div`
  position: relative;
  flex-shrink: 0;
  width: var(--radio_size);
  height: var(--radio_size);
  border: 1.5px solid rgba(188, 195, 208, 0.5);
  border-radius: 50%;
  margin-right: 10px;

    ${InputStyled}:checked + & {
        background-color: var(--main_red);
        border-color: var(--main_red);
    }
`;

const LabelStyled = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  & ${InputStyled}:checked + ${RadioIconStyled}:after {
    content: '';
    position: absolute;
    inset: min(4px, 1vw);
    border-radius: 50%;
    background-color: #FFFFFF;
  }
`;

const TextWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  min-height: 100%;
`;

const TextStyled = styled(CommonText)`
  margin-top: 2px;
`;

export const RadioButton = (props) => {
    const { name, checked, children, onChange, className } = props;

    return (
        <WrapperStyled>
            <LabelStyled className={className}>
                <InputStyled
                    type='radio'
                    name={name}
                    checked={checked}
                    onChange={onChange}
                />
                <RadioIconStyled />
                <TextWrapperStyled>
                    <TextStyled>{children}</TextStyled>
                </TextWrapperStyled>
            </LabelStyled>
        </WrapperStyled>
    );
};
