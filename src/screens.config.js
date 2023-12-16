import { Screen1 } from "./components/screens/screen1";
import { Screen2 } from "./components/screens/screen2";
import { Screen3 } from "./components/screens/screen3";
import { Screen4 } from "./components/screens/screen4";
import bgGame from "./assets/images/bgGame.png";
import deleteBg from "./assets/images/delete.svg";
import bgWin from "./assets/images/bgWin.png";
import blueBall from './assets/images/blueBall.png';
import redBall from './assets/images/redBall.png';
import stars from './assets/images/stars.png';
import composition from './assets/images/headerComposition.png';
import formBg from './assets/images/formBg.png';

export const screens = [
    {
        id: 0,
        component: Screen1,
        preloadImages: [bgGame, deleteBg, bgWin, formBg],
    },
    {
        id: 1,
        component: Screen2,
        preloadImages: [stars, blueBall, redBall, composition],
    },
    {
        id: 2,
        component: Screen3
    },
    {
        id: 3,
        component: Screen4
    }
];
