import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'

function Home() {
    return (
        <HomeStyled>
            <div className="banner">
                <h1>Finceptive</h1>
                <h6>Your financial compass</h6>

            </div>
            <Link to="/register">Create a new account</Link>
            <Link to="/login">Sign in</Link>

        </HomeStyled>

    )

}

const HomeStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .banner {
        width: 100%;
        display: flex;
        flex-direction: column;
        color: black;
        justify-content: center;
        align-items: center;
        padding: 30px;
        border-bottom: 20px;
    }

`
export default Home;