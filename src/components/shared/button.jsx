import styled from 'styled-components';

const TYPE_TO_COLOR = {
    main: 'white',
    secondary: 'black'
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

    &:disabled {
        opacity: 0.6;
    }
`;

export const Button = ({ type = 'main', ...props }) => <Wrapper {...props} $type={type} />;

export const ButtonCentered = styled(Button)`
    margin: 0 auto;
`;