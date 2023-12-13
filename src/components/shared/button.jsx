import styled from 'styled-components';

const TYPE_TO_COLOR = {
    main: 'white',
    secondary: 'black'
};

const TYPE_TO_DISABLED = {
    main: 'rgba(255, 0, 50, 0.6)',
    secondary: 'rgba(242 243 247, 0.6);'
};

export const Wrapper = styled.button`
    color: ${({$type}) => TYPE_TO_COLOR[$type]};
    background: var(--main_${({$type}) => $type === 'main' ? 'red' : 'gray'});
    text-transform: uppercase;
    width: 100%;
    max-width: min(93.333vw, 350px);
    padding: min(14px, 3.7vw);
    border-radius: 16px;
    font-size: 12px;
    user-select: none;

    &:disabled {
        background-color: ${({$type}) => TYPE_TO_DISABLED[$type]};  
    }
`;

export const Button = ({ type = 'main', ...props }) => <Wrapper {...props} $type={type} />;

export const ButtonCentered = styled(Button)`
    margin: 0 auto;
`;