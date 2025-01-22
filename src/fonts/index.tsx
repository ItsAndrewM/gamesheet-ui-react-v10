import { createGlobalStyle } from "styled-components";
import KapraWoff from "./KapraNeueProMediumRd.woff";
import KapraWoff2 from "./KapraNeueProMediumRd.woff2";
import PitchSansBoldWoff from "./PitchSansWeb-Bold.woff";
import PitchSansBoldWoff2 from "./PitchSansWeb-Bold.woff2";
import PitchSansMediumWoff from "./PitchSansWeb-Medium.woff";
import PitchSansMediumWoff2 from "./PitchSansWeb-Medium.woff2";
import "./typography.scss";
import "../index.css";

export const FontStyles = createGlobalStyle`

@tailwind base;
@tailwind components;
@tailwind utilities;
@tailwind forms;

body {
    font-family: 'Rubik', sans-serif;
    font-size: 16px;
    line-height: 1.5;
}

@font-face {
  font-family: 'Kapra Neue Pro';
  src: url(${KapraWoff2}) format('woff2'),
       url(${KapraWoff}) format('woff');
}

@font-face {
    font-family: 'Pitch Sans Bold';
    src: url(${PitchSansBoldWoff2}) format('woff2'),
         url(${PitchSansBoldWoff}) format('woff');
}

@font-face {
    font-family: 'Pitch Sans Medium';
    src: url(${PitchSansMediumWoff2}) format('woff2'),
         url(${PitchSansMediumWoff}) format('woff');
}
`;

export default FontStyles;
