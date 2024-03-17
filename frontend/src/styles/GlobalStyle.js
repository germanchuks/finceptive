import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        list-style: none;
    }
    body {
        font-family: "Lato", sans-serif;
        color: rgba(255, 255, 255, 1);
        overflow: hidden;
        font-size: clamp(1rem, 1vw, 1.5rem);
    }
`;

export { GlobalStyle };