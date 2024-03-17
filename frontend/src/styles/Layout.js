import styled from 'styled-components';

const MainLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 1280px;
`

const InnerLayout = styled.div`
    width: 100%;
    height: 100%;
    padding: 0.8rem 1.2rem;
`

export { MainLayout, InnerLayout }