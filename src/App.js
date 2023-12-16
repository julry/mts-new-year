import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FlexWrapper } from './components/shared/flex-wrapper';
import { ProgressProvider } from './context/ProgressContext';
import { useProgressInit } from './hooks/useProgressInit';
import { preloadImage } from './utils/preloadImage';
import bgDesk from './assets/images/bgDesktop.png';
import cone from './assets/images/bigCone.png';
import star from './assets/images/bigStar.png';

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

  @media screen and (min-width: 640px) {
    background: url(${bgDesk}) no-repeat 0 0 /cover;
  }
`;

const ComponentWrapper = styled(FlexWrapper)`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 2;

  @media screen and (min-width: 640px) {
    max-width: 400px;
    border: 3px solid black;
    border-radius: 20px;
    margin: auto;
    max-height: 850px;

    @media screen and (max-height: 860px) {
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }
`;

const Elements = styled.div`
  position: absolute;
  z-index: 0;
  inset: 0;

  @media screen and (max-width: 640px) {
    display: none;
  }
`;

const BigImage = styled.img`
  position: absolute;
  object-fit: contain;
`;

const Star = styled(BigImage)`
  min-width: 350px;
  min-height: 331px;
  left: calc(50% - 6vw);
  transform: translateX(-100%);
  top: 17.5%;
  width: 30vw;
  max-width: 868px;
  height: 31.8vw;
  max-height: 916px;
`;

const Cone = styled(BigImage)`
  min-width: 371px;
  min-height: 350px;
  right: calc(50% - 12vw);
  transform: translateX(100%);
  bottom: 5.8%;
  width: 36.9vw;
  max-width: 920px;
  height: 38.6vw;
  max-height: 968px;
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


  useEffect(() => {
    let preloadImages = screen?.preloadImages;
    const clears = preloadImages && preloadImages.map(img => preloadImage(img));
    return () => clears && clears.forEach(clear => clear());
  }, [screen]);

  return (
      <ProgressProvider value={progress}>
        <Wrapper height={height}>
          <Elements>
            <Star src={star} alt="" /> 
            <Cone src={cone} alt="" /> 
          </Elements>
          <ComponentWrapper>
            <Component />
          </ComponentWrapper>
        </Wrapper>
      </ProgressProvider>
  );
}

export default App;
