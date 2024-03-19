import React from 'react'
import styled from 'styled-components'

function Button({ name, icon, bg, padd, onClick, color, bdRad }) {
    return (
        <ButtonStyled style={{
            background: bg,
            padding: padd,
            borderRadius: bdRad,
            color: color,
        }} onClick={onClick}>
            {icon}
            {name}
        </ButtonStyled>
    )
}

const ButtonStyled = styled.button`
    display: flex;
    align-items: center;
    border: none;
    font-family: inherit;
    font-size: inherit;
    gap: .75rem;
    cursor: pointer;
    outline: none;
    transition: all .2s ease-in-out;
`;


export default Button