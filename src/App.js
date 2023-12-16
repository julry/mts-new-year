import { useEffect, useState } from 'react';
import styled from 'styled-components';
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

  @media screen and (min-width: 640px) and (max-height: 600px) {
    --screen_padding: 12px;
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

    & > div {
      border-radius: 20px;
    }
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
