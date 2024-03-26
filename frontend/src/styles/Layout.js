import styled from 'styled-components';

const MainLayout = styled.div`
    
    display: flex;
    height: 90%;
    width: 100%;

    @media (max-width: 750px) {
        flex-direction: column;
    }

    @media (min-width: 750px) {
        flex-direction: row
    }
`

const InnerLayout = styled.div`
    display: flex;
    width: 100%;
    height: 100%;   
    gap: 1rem;

    @media (min-width: 750px) {
        padding: 1rem;
        flex-direction: row;
    }

    @media (max-width: 750px) {
        padding: 0.8rem 1.2rem;
        padding-bottom: 3.5rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`

export { MainLayout, InnerLayout }