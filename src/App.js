import { useEffect, useState } from 'react';
import styled from 'styled-components';
import bg from './assets/images/bg.png';
import { FlexWrapper } from './components/shared/flex-wrapper';
import { ProgressProvider } from './context/ProgressContext';
import { useProgressInit } from './hooks/useProgressInit';

const Wrapper = styled(FlexWrapper)`
  height: ${({height}) => height}px;
  overflow-x: hidden;
  align-items: center;
  white-space: pre-line;

  @media screen and (min-width: 640px) and (max-height: 800px) {
    --screen_padding: 22px;
  }
  
  @media screen and (min-width: 640px) and (max-height: 700px) {
    --screen_padding: 16px;
  }
  
  @media screen and (max-width: 300px) {
    --screen_padding: 4.3vw;
  }
`;

const ComponentWrapper = styled(FlexWrapper)`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;

  @media screen and (min-width: 640px) {
    max-width: 400px;
    border: 3px solid black;
    border-radius: 20px;
    margin: 5px auto 5px;
    max-height: 850px;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -2;
    background-image: url(${bg});
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    margin: -35px;
    filter: blur(2px);
  }
`;


function App() {
  const [height, setHeight] = useState(100);
  const progress = useProgressInit();
  const { screen } = progress;

  const Component = screen?.component || (() => null);

  useEffect(() => {
    function handleResize() {
      const viewportHeight = document.documentElement.clientHeight;
      setHeight(viewportHeight);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
      <ProgressProvider value={progress}>
        <Wrapper height={height}>
          <ComponentWrapper>
            <Component />
          </ComponentWrapper>
        </Wrapper>
      </ProgressProvider>
  );
}

export default App;
