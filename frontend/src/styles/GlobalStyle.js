import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        list-style: none;
    }
    body {
        color: rgba(255, 255, 255, 1);
        overflow: hidden;
        font-size: clamp(1.2rem, 1vw, 1.7rem);
        font-family: Garamond, serif;
        

    }
`;

export { GlobalStyle };